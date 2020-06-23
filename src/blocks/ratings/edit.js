/**
 * Inline Notice Block.
 */

// Import block dependencies and components
import classnames from 'classnames';
import styling from "./styling"
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon"
import FontIconPicker from "@fonticonpicker/react-fonticonpicker"
import UAGBIcon from "../../../dist/blocks/uagb-controls/UAGBIcon.json"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import times from "lodash/times"

// Import all of our Text Options requirements.
import TypographyControl from "../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../components/typography/fontloader"

// Setup the block

const { __ } = wp.i18n

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	ColorPalette,
	MediaUpload,
} = wp.blockEditor

const {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	Button,
} = wp.components

const {
	Component,
	Fragment,
} = wp.element

let svg_icons = Object.keys( UAGBIcon )

let imageSizeOptions = [
	{ value: "thumbnail", label: __( "Thumbnail" ) },
	{ value: "medium", label: __( "Medium" ) },
	{ value: "full", label: __( "Large" ) }
]

class UAGBInlineNoticeEdit extends Component {

	constructor() {

		super( ...arguments )

		this.onRemoveImage = this.onRemoveImage.bind( this )
		this.onSelectImage = this.onSelectImage.bind( this )
		this.getImageSize  = this.getImageSize.bind( this )
	}

	componentDidMount() {
		// Assigning block_id in the attribute.
		this.props.setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } )

		// Pushing Style tag for this block css.
		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-ratings-style-" + this.props.clientId.substr( 0, 8 ) )
		document.head.appendChild( $style )
	}

	componentDidUpdate( prevProps ) {
		var element = document.getElementById( "uagb-ratings-style-" + this.props.clientId.substr( 0, 8 ) )

		if( null !== element && undefined !== element ) {
			element.innerHTML = styling( this.props )
		}
	}

	savefeatures( value, index ) {
			const { attributes, setAttributes } = this.props
			const { features } = attributes

		const newItems = features.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = { ...item, ...value }
			}

			return item
		} )

			setAttributes( {
				features: newItems,
			} )
		}

	/*
	 * Event to set Image as null while removing.
	 */
	onRemoveImage() {
		const { setAttributes } = this.props
		setAttributes( { mainimage: null } )
	}

	/*
	 * Event to set Image as while adding.
	 */
	onSelectImage( media ) {
		const { setAttributes } = this.props

		if ( ! media || ! media.url ) {
			setAttributes( { mainimage: null } )
			return
		}

		if ( ! media.type ) {
			return
		}

		setAttributes( { mainimage: media } )
		if ( media["sizes"] ) {
			var new_img = this.getImageSize(media["sizes"])
			imageSizeOptions = new_img
		}
	}

	getImageSize(sizes) {
		var size_arr = []
		$.each(sizes, function (index, item) {
		  var name = index
		  	var p = { "value" : name, "label": name }
		  	size_arr.push(p)
		})
		return(size_arr)
	}

	render() {

		// Setup the attributes
		const {
			attributes: {
				block_id,
				rTitle,
				rContent,
				mainimage,
				imgSize,
				showFeature,
				feature_count,
				featuresTitle,
				features,
				headingTag,
			},
			setAttributes,
			className,
			attributes,
			mergeBlocks,
		} = this.props;

		if( mainimage && mainimage["sizes"] ){
			imageSizeOptions = this.getImageSize(mainimage["sizes"])
		}

			let url_chk = ''
			let title = ''
			if( "undefined" !== typeof attributes.mainimage  && null !== attributes.mainimage && "" !== attributes.mainimage ){
				url_chk = attributes.mainimage.url
				title = attributes.mainimage.title
			}
			
			let url = ''
			if( '' !== url_chk ){
				let size = attributes.mainimage.sizes
				let imageSize = attributes.imgSize

				if ( "undefined" !== typeof size && "undefined" !== typeof size[imageSize] ) {
				  url = size[imageSize].url 
				}else{
				  url = url_chk 
				}
		}

		let image_icon_html = ''

		if ( mainimage && mainimage.url ) {

			image_icon_html = <img className="uagb-howto__source-image" src={url} title={title}/>

		}


		const ratingGeneralSettings = () => {
			return (
				<PanelBody title={ __( "General" ) } initialOpen={ true }>
					<h2>{ __( "Image" ) }</h2>
					<MediaUpload
						title={ __( "Select Image" ) }
						onSelect={ ( value ) => setAttributes( { mainimage: value } ) }
						allowedTypes={ [ "image" ] }
						value={ mainimage }
						render={ ( { open } ) => (
							<Button isDefault onClick={ open }>
								{ ! mainimage.url ? __( "Select Image" ) : __( "Replace image" ) }
							</Button>
						) }
					/>
					{ mainimage.url &&
						<Button
							className="uagb-rm-btn"
							onClick={ () => setAttributes( { mainimage: '' } ) }
							isLink isDestructive>
							{ __( "Remove Image" ) }
						</Button>
					}
					{ mainimage.url &&
						<SelectControl
							label={ __( "Size" ) }
							options={ imageSizeOptions }
							value={ imgSize }
							onChange={ ( value ) => setAttributes( { imgSize: value } ) }
						/>
					}
					<h2>{ __( "Primary Heading" ) }</h2>
						<SelectControl
							label={ __( "Tag" ) }
							value={ headingTag }
							onChange={ ( value ) => setAttributes( { headingTag: value } ) }
							options={ [
								{ value: "h1", label: __( "H1" ) },
								{ value: "h2", label: __( "H2" ) },
								{ value: "h3", label: __( "H3" ) },
								{ value: "h4", label: __( "H4" ) },
								{ value: "h5", label: __( "H5" ) },
								{ value: "h6", label: __( "H6" ) },
							] }
					/>
					<hr className="uagb-editor__separator" />
					<ToggleControl
						label={ __( "Show features" ) }
						checked={ showFeature }
						onChange={ ( value ) => setAttributes( { showFeature: ! showFeature } ) }
						help={ __( "Note: This is recommended field for schema.It should be ON" ) }
					/>
					{ showFeature &&
						<RangeControl
							label={ __( "Number of Feature" ) }
							value={ feature_count }
							onChange={ newCount => {

								let cloneIcons = [ ...features ]

								if ( cloneIcons.length < newCount ) {

									const incAmount = Math.abs( newCount - cloneIcons.length )

									{ times( incAmount, n => {

										cloneIcons.push( {
											"feature_name": "- Feature Name." + ( cloneIcons.length + 1 ),
										} )

									} ) }

									setAttributes( { features: cloneIcons } )
								}else{
									const incAmount = Math.abs( newCount - cloneIcons.length )
									let data_new = cloneIcons
					            for( var i= 0; i < incAmount; i++ ){
					                data_new.pop()
					            }
					            setAttributes({features:data_new})

								}
								setAttributes( { feature_count: newCount } )
							} }
							min={ 1 }
							max={ 50 }
						/>
						}
				</PanelBody>
			)
		}
		
		return (
			<Fragment>
				<InspectorControls>
					{ ratingGeneralSettings() }
				</InspectorControls>
			<div className={ classnames(
				className,
				"uagb-ratings__outer-wrap",
				`uagb-block-${ block_id }`
				) }
				>
				<RichText
					tagName={ headingTag }
					placeholder={ __( 'Review Title', 'ultimate-addons-for-gutenberg' ) }
					keepPlaceholderOnFocus
					value={ rTitle }
					className='uagb-rating-title'
					onChange={ ( value ) =>
						setAttributes( { rTitle: value } )
					}
				/>
				<RichText
					tagName="p"
					placeholder={ __( 'Review Description', 'ultimate-addons-for-gutenberg' ) }
					keepPlaceholderOnFocus
					value={ rContent }
					className='uagb-rating-desc'
					onChange={ ( value ) =>
						setAttributes( { rContent: value } )
					}
				/>
				<div className="uagb-rating__source-wrap">{image_icon_html}</div>
				<div className="uagb-rating__wrap">
					{ showFeature &&
					<RichText
						tagName="h4"
						placeholder={ __( "List Of Features:" ) }
						value={ featuresTitle }
						className='uagb-rating-feature-text'
						onChange={ ( value ) => setAttributes( { featuresTitle: value } ) }
						onMerge={ mergeBlocks }
						unstableOnSplit={ this.splitBlock }
						onnRemove={ () => onReplace( [] ) }
					/>
					}
					{ showFeature &&
					<div className="uagb-ratings-feature">
								{
								features.map( ( features, index ) => {

										return (
											<div
												className={ classnames(
													`uagb-rating-feature-${index}`,
													"uagb-rating-feature-child__wrapper",
												) }
												key={ index }
											>
												<div className="uagb-features">
													<RichText
														tagName="div"
														placeholder={ __( "Requirements Features:" ) }
														value={ features.features_name }
														onChange={ value => {
																	this.savefeatures( { features_name: value }, index )
																} }
														className='uagb-rating-feature__label'
														placeholder={ __( "Description" ) }
														multiline={false}
														allowedFormats={[ 'core/bold', 'core/italic', 'core/strikethrough' ]}
													/>
												</div>
											</div>
										)
									})
								}
					</div>
					}
				</div>
			</div>
			
			</Fragment>
		)
	}
}

export default UAGBInlineNoticeEdit