<?php
/**
 * UAGB Forms.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_Forms' ) ) {

	/**
	 * Class UAGB_Forms.
	 */
	class UAGB_Forms {


		/**
		 * Member Variable
		 *
		 * @since x.x.x
		 * @var instance
		 */
		private static $instance;

		/**
		 * Member Variable
		 *
		 * @since x.x.x
		 * @var settings
		 */
		private static $settings;

		/**
		 *  Initiator
		 *
		 * @since x.x.x
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 */
		public function __construct() {
			add_action( 'wp_ajax_uagb_process_forms', array( $this, 'process_forms' ) );
			add_action( 'wp_ajax_nopriv_uagb_process_forms', array( $this, 'process_forms' ) );

		}

		public function process_forms() {
			check_ajax_referer( 'uagb_forms_ajax_nonce', 'nonce' );
			


			// Google recaptcha secret key verification starts.
			$uagb_google_recaptcha_verify = isset( $_POST['uagab_captcha_keys'] ) ? 1 : 0;

			if ( $uagb_google_recaptcha_verify ) {

				$google_recaptcha = isset( $_POST['uagb_captcha_response'] )  ? $_POST['uagb_captcha_response'] : '';

				$google_recaptcha_secret_key = $_POST['uagab_captcha_keys']['secret'];

				// calling google recaptcha api.
				$google_url             = 'https://www.google.com/recaptcha/api/siteverify';
				$google_response        = add_query_arg(
					array(
						'secret'   => $google_recaptcha_secret_key,
						'response' => $google_recaptcha,
						'remoteip' => $_SERVER['REMOTE_ADDR'],
					),
					$google_url
				);
				$google_response        = wp_remote_get( $google_response );
				$decode_google_response = json_decode( $google_response['body'] );
				
				if ( false === $decode_google_response->success ) {					
					wp_send_json_error( $response );
				} 
			}
			

			$form_data        = $_POST['form_data'];			

			$body  = '';
			$body .= '<div style="border: 50px solid #f6f6f6;">';
			$body .= '<div style="padding: 15px;">';

			foreach ( $form_data as $key => $value ) {

				if( $key ){
					if ( is_array( $value ) ) {
						$body .= '<p><strong>' . str_replace( '_', ' ', ucwords( $key ) ) . '</strong> - ' . implode( ', ', $value ) . '</p>';
					} else {
						$body .= '<p><strong>' . str_replace( '_', ' ', ucwords( $key ) ) . '</strong> - ' . sanitize_text_field( $value ) . '</p>';
					}
				}
			}
			$body .= '<p style="text-align:center;">This e-mail was sent from a ' . get_bloginfo( 'name' ) . ' ( ' . site_url() . ' )</p>';
			$body .= '</div>';
			$body .= '</div>';

			
			// if(isset($_POST['file_upload_data'])){
			// 	$upload_files = $_POST['file_upload_data'];
			// 	$extensions = array();
			// 	foreach ($upload_files as $key => $value) {					
			// 		$ext = pathinfo($value, PATHINFO_EXTENSION);
			// 		$file_basename = pathinfo($value, PATHINFO_FILENAME);
			// 		$extensions[$file_basename] = $ext;
			// 	}				
			// 	$this->upload_media($extensions);
			// }
			$this->send_email(  $body );
		}

		// public function generate_file_name($extensions) {
		// 	$file_names = array();
		// 	foreach ($extensions as $key => $value) {					
		// 		$hexed_file_name = md5(uniqid(rand(), true));
		// 		$hexed_file_name .= ".$value";
		// 		$file_names[] = $hexed_file_name;
		// 	}
		// 	return $file_names;

		// }

		// public function upload_media($extensions) {
		// 	$plugin_upload_dir = 'uagb-forms-uploads';
		// 	$plugin_upload_path = WP_CONTENT_DIR . '/uploads' . '/' . $plugin_upload_dir;
		// 	print_r($plugin_upload_path);
		// 	wp_mkdir_p( $plugin_upload_path );

		// 	$file_name = $this->generate_file_name($extensions);

        // 	move_uploaded_file("edd.docx", $plugin_upload_path . '/' . $file_name);
        
			
		// 	$file_names_email = array();
		// 	foreach ($file_name as $key => $value) {				 
		// 		$file_names_email[] = array(
		// 			'path' => $plugin_upload_path . '/' . $value,
		// 			'filename' => $value
		// 		);
		// 	}
		// 	return $file_names_email;
			
			
		// }

		public function send_email(  $body ) {
			check_ajax_referer( 'uagb_forms_ajax_nonce', 'nonce' );
			$after_submit_data =isset( $_POST['after_submit_data']);

			$to =  $after_submit_data['to']  ? sanitize_email( $after_submit_data['to'] ) : sanitize_email(get_option( 'admin_email' ));
			$subject =  $after_submit_data['subject']  ? esc_html( $after_submit_data['subject'] ) : "Form Submission";

			$headers = array(
				'Reply-To-: ' . get_bloginfo( 'name' ) . ' <' . $to . '>',
				'Content-Type: text/html; charset=UTF-8',
			);
			
			$succefull_mail = wp_mail( $to, $subject, $body, $headers );

			if ( $succefull_mail ){
				wp_send_json_success( 200 );
			} else {
				wp_send_json_success( 400 );
			}

		}





	}

	/**
	 *  Prepare if class 'UAGB_Forms' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	UAGB_Forms::get_instance();
}