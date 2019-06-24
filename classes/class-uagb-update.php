<?php
/**
 * Update Compatibility
 *
 * @package UAGB
 */

if ( ! class_exists( 'UAGB_Update' ) ) :

	/**
	 * UAGB Update initial setup
	 *
	 * @since x.x.x
	 */
	class UAGB_Update {

		/**
		 * Class instance.
		 *
		 * @access private
		 * @var $instance Class instance.
		 */
		private static $instance;

		/**
		 * Initiator
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 *  Constructor
		 */
		public function __construct() {
			add_action( 'admin_init', __CLASS__ . '::init' );
		}

		/**
		 * Init
		 *
		 * @since x.x.x
		 * @return void
		 */
		static public function init() {

			do_action( 'uagb_update_before' );

			// Get auto saved version number.
			$saved_version = get_option( 'uagb-version', false );

			// Update auto saved version number.
			if ( ! $saved_version ) {
				update_option( 'uagb-version', UAGB_VER );
				return;
			}

			// If equals then return.
			if ( version_compare( $saved_version, UAGB_VER, '=' ) ) {
				return;
			}

			UAGB_Helper::create_specific_stylesheet();

			// Update auto saved version number.
			update_option( 'uagb-version', UAGB_VER );

			do_action( 'uagb_update_after' );
		}
	}

	/**
	 * Kicking this off by calling 'get_instance()' method
	 */
	UAGB_Update::get_instance();

endif;
