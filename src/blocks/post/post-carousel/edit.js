/**
 * External dependencies
 */

import get from "lodash/get"
import isUndefined from "lodash/isUndefined"
import pickBy from "lodash/pickBy"
import map from "lodash/map"
import UAGB_Block_Icons from "../../../../dist/blocks/uagb-controls/block-icons"

// Import all of our Text Options requirements.
import TypographyControl from "../../../components/typography"

// Import Web font loader for google fonts.
import WebfontLoader from "../../../components/typography/fontloader"

// Import Post Components
import Blog from "./blog"
import styling from ".././styling"

const { Component, Fragment } = wp.element
const { __ } = wp.i18n
const { decodeEntities } = wp.htmlEntities
const MAX_POSTS_COLUMNS = 4
const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	SelectControl,
	Spinner,
	ToggleControl,
	Toolbar,
	ButtonGroup,
	Button,
	TabPanel,
	Dashicon,
	TextControl
} = wp.components

const {
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls,
	ColorPalette,
	RichText
} = wp.editor

const { withSelect } = wp.data

class UAGBPostCarousel extends Component {

	componentDidMount() {

		this.props.setAttributes( { block_id: this.props.clientId } )

		const $style = document.createElement( "style" )
		$style.setAttribute( "id", "uagb-post-carousel-style-" + this.props.clientId )
		document.head.appendChild( $style )
	}

	render() {
		const {
			attributes,
			categoriesList,
			setAttributes,
			latestPosts
		} = this.props
		const {
			block_id,
			displayPostDate,
			displayPostComment,
			displayPostExcerpt,
			displayPostAuthor,
			displayPostImage,
			imgSize,
			imgPosition,
			displayPostLink,
			newTab,
			ctaText,
			borderWidth,
			borderStyle,
			borderColor,
			borderHColor,
			borderRadius,
			btnVPadding,
			btnHPadding,
			align,
			postLayout,
			columns,
			tcolumns,
			mcolumns,
			order,
			orderBy,
			categories,
			postsToShow,
			rowGap,
			columnGap,
			bgColor,
			contentPadding,
			contentPaddingMobile,
			titleColor,
			titleTag,
			titleFontSize,
			titleFontSizeType,
			titleFontSizeMobile,
			titleFontSizeTablet,
			titleFontFamily,
			titleFontWeight,
			titleFontSubset,
			titleLineHeightType,
			titleLineHeight,
			titleLineHeightTablet,
			titleLineHeightMobile,
			titleLoadGoogleFonts,
			metaFontSize,
			metaFontSizeType,
			metaFontSizeMobile,
			metaFontSizeTablet,
			metaFontFamily,
			metaFontWeight,
			metaFontSubset,
			metaLineHeightType,
			metaLineHeight,
			metaLineHeightTablet,
			metaLineHeightMobile,
			metaLoadGoogleFonts,
			excerptFontSize,
			excerptFontSizeType,
			excerptFontSizeTablet,
			excerptFontSizeMobile,
			excerptFontFamily,
			excerptFontWeight,
			excerptFontSubset,
			excerptLineHeightType,
			excerptLineHeight,
			excerptLineHeightTablet,
			excerptLineHeightMobile,
			excerptLoadGoogleFonts,
			ctaFontSize,
			ctaFontSizeType,
			ctaFontSizeTablet,
			ctaFontSizeMobile,
			ctaFontFamily,
			ctaFontWeight,
			ctaFontSubset,
			ctaLineHeightType,
			ctaLineHeight,
			ctaLineHeightTablet,
			ctaLineHeightMobile,
			ctaLoadGoogleFonts,
			metaColor,
			excerptColor,
			ctaColor,
			ctaBgColor,
			ctaHColor,
			ctaBgHColor,
			arrowColor,
			titleBottomSpace,
			metaBottomSpace,
			excerptBottomSpace,
			autoplay,
			autoplaySpeed,
			pauseOnHover,
			infiniteLoop,
			transitionSpeed,
			arrowDots,
			arrowSize,
			arrowBorderSize,
			arrowBorderRadius,
			excerptLength,
			overlayOpacity,
			bgOverlayColor,
			linkBox
		} = attributes

		const hoverSettings = (
			<Fragment>
				<p className="uagb-setting-label">{ __( "Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaHColor }} ></span></span></p>
				<ColorPalette
					value={ ctaHColor }
					onChange={ ( colorValue ) => setAttributes( { ctaHColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Background Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBgHColor }} ></span></span></p>
				<ColorPalette
					value={ ctaBgHColor }
					onChange={ ( colorValue ) => setAttributes( { ctaBgHColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Border Hover Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderHColor }} ></span></span></p>
				<ColorPalette
					value={ borderHColor }
					onChange={ ( colorValue ) => setAttributes( { borderHColor: colorValue } ) }
					allowReset
				/>
			</Fragment>
		)

		const normalSettings = (
			<Fragment>
				<p className="uagb-setting-label">{ __( "Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaColor }} ></span></span></p>
				<ColorPalette
					value={ ctaColor }
					onChange={ ( colorValue ) => setAttributes( { ctaColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: ctaBgColor }} ></span></span></p>
				<ColorPalette
					value={ ctaBgColor }
					onChange={ ( colorValue ) => setAttributes( { ctaBgColor: colorValue } ) }
					allowReset
				/>
				<p className="uagb-setting-label">{ __( "Border Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
				<ColorPalette
					value={ borderColor }
					onChange={ ( colorValue ) => setAttributes( { borderColor: colorValue } ) }
					allowReset
				/>
			</Fragment>
		)

		const sizeTypes = [
			{ key: "px", name: __( "px" ) },
			{ key: "em", name: __( "em" ) },
		]

		let loadTitleGoogleFonts
		let loadMetaGoogleFonts
		let loadExcerptGoogleFonts
		let loadCtaGoogleFonts

		if( titleLoadGoogleFonts == true ) {
					
			const titleconfig = {
				google: {
					families: [ titleFontFamily + ( titleFontWeight ? ":" + titleFontWeight : "" ) ],
				},
			}

			loadTitleGoogleFonts = (
				<WebfontLoader config={ titleconfig }>
				</WebfontLoader>
			)
		}
		
		if( metaLoadGoogleFonts == true ) {
					
			const metaconfig = {
				google: {
					families: [ metaFontFamily + ( metaFontWeight ? ":" + metaFontWeight : "" ) ],
				},
			}

			loadMetaGoogleFonts = (
				<WebfontLoader config={ metaconfig }>
				</WebfontLoader>
			)
		}
		
		if( excerptLoadGoogleFonts == true ) {
					
			const excerptconfig = {
				google: {
					families: [ excerptFontFamily + ( excerptFontWeight ? ":" + excerptFontWeight : "" ) ],
				},
			}

			loadExcerptGoogleFonts = (
				<WebfontLoader config={ excerptconfig }>
				</WebfontLoader>
			)
		}
		
		if( ctaLoadGoogleFonts == true ) {
					
			const ctaconfig = {
				google: {
					families: [ ctaFontFamily + ( ctaFontWeight ? ":" + ctaFontWeight : "" ) ],
				},
			}

			loadCtaGoogleFonts = (
				<WebfontLoader config={ ctaconfig }>
				</WebfontLoader>
			)
		}

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( "General" ) }>
					<QueryControls
						{ ...{ order, orderBy } }
						numberOfItems={ postsToShow }
						categoriesList={ categoriesList }
						selectedCategoryId={ categories }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
						onCategoryChange={ ( value ) => setAttributes( { categories: "" !== value ? value : undefined } ) }
						onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>
					<TabPanel className="uagb-size-type-field-tabs uagb-without-size-type" activeClass="active-tab"
						tabs={ [
							{
								name: "desktop",
								title: <Dashicon icon="desktop" />,
								className: "uagb-desktop-tab uagb-responsive-tabs",
							},
							{
								name: "tablet",
								title: <Dashicon icon="tablet" />,
								className: "uagb-tablet-tab uagb-responsive-tabs",
							},
							{
								name: "mobile",
								title: <Dashicon icon="smartphone" />,
								className: "uagb-mobile-tab uagb-responsive-tabs",
							},
						] }>
						{
							( tab ) => {
								let tabout

								if ( "mobile" === tab.name ) {
									tabout = (
										<RangeControl
											label={ __( "Columns" ) }
											value={ mcolumns }
											onChange={ ( value ) => setAttributes( { mcolumns: value } ) }
											min={ 1 }
											max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
										/>
									)
								} else if ( "tablet" === tab.name ) {
									tabout = (
										<RangeControl
											label={ __( "Columns" ) }
											value={ tcolumns }
											onChange={ ( value ) => setAttributes( { tcolumns: value } ) }
											min={ 1 }
											max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
										/>
									)
								} else {
									tabout = (
										<RangeControl
											label={ __( "Columns" ) }
											value={ columns }
											onChange={ ( value ) => setAttributes( { columns: value } ) }
											min={ 1 }
											max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
										/>
									)
								}

								return <div>{ tabout }</div>
							}
						}
					</TabPanel>
				</PanelBody>
				<PanelBody title={ __( "Carousel" ) } initialOpen={ false }>
					<ToggleControl
						label={ __( "Pause On Hover" ) }
						checked={ pauseOnHover }
						onChange={ ( value ) => setAttributes( { pauseOnHover: ! pauseOnHover } ) }
					/>
					<ToggleControl
						label={ __( "Autoplay" ) }
						checked={ autoplay }
						onChange={ ( value ) => setAttributes( { autoplay: ! autoplay } ) }
					/>
					{ autoplay == true &&
						<RangeControl
							label={ __( "Autoplay Speed (ms)" ) }
							value={ autoplaySpeed }
							onChange={ ( value ) => setAttributes( { autoplaySpeed: value } ) }
							min={ 100 }
							max={ 10000 }
						/>
					}
					<ToggleControl
						label={ __( "Infinite Loop" ) }
						checked={ infiniteLoop }
						onChange={ ( value ) => setAttributes( { infiniteLoop: ! infiniteLoop } ) }
					/>
					<RangeControl
						label={ __( "Transition Speed (ms)" ) }
						value={ transitionSpeed }
						onChange={ ( value ) => setAttributes( { transitionSpeed: value } ) }
						min={ 100 }
						max={ 5000 }
					/>
					<hr className="uagb-editor__separator" />
					<h2>{ __( "Arrows & Dots" ) }</h2>
					<SelectControl
						label={ __( "Show Arrows & Dots" ) }
						value={ arrowDots }
						onChange={ ( value ) => setAttributes( { arrowDots: value } ) }
						options={ [
							{ value: "arrows", label: __( "Only Arrows" ) },
							{ value: "dots", label: __( "Only Dots" ) },
							{ value: "arrows_dots", label: __( "Both Arrows & Dots" ) },
						] }
					/>
					{ "dots" != arrowDots &&
						<Fragment>
							<RangeControl
								label={ __( "Arrow Size" ) }
								value={ arrowSize }
								onChange={ ( value ) => setAttributes( { arrowSize: value } ) }
								min={ 0 }
								max={ 50 }
							/>
							<RangeControl
								label={ __( "Arrow Border Size" ) }
								value={ arrowBorderSize }
								onChange={ ( value ) => setAttributes( { arrowBorderSize: value } ) }
								min={ 0 }
								max={ 50 }
							/>
							<RangeControl
								label={ __( "Arrow Border Radius" ) }
								value={ arrowBorderRadius }
								onChange={ ( value ) => setAttributes( { arrowBorderRadius: value } ) }
								min={ 0 }
								max={ 50 }
							/>
						</Fragment>
					}
				</PanelBody>
				<PanelBody title={ __( "Image" ) } initialOpen={ false }>
					<ToggleControl
						label={ __( "Show Featured Image" ) }
						checked={ displayPostImage }
						onChange={ ( value ) => setAttributes( { displayPostImage: ! displayPostImage } ) }
					/>
					{ displayPostImage == true &&
						<SelectControl
							label={ __( "Image Sizes" ) }
							value={ imgSize }
							onChange={ ( value ) => setAttributes( { imgSize: value } ) }
							options={ uagb_blocks_info.image_sizes }
						/>
					}
					{ displayPostImage == true &&
						<SelectControl
							label={ __( "Image Position" ) }
							value={ imgPosition }
							onChange={ ( value ) => setAttributes( { imgPosition: value } ) }
							options={ [
								{ value: "top", label: __( "Top" ) },
								{ value: "background", label: __( "Background" ) },
							] }
						/>
					}
					{ displayPostImage == true && imgPosition == "background" &&
						<Fragment>
							<p className="uagb-setting-label">{ __( "Background Overlay Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: bgOverlayColor }} ></span></span></p>
							<ColorPalette
								value={ bgOverlayColor }
								onChange={ ( colorValue ) => setAttributes( { bgOverlayColor: colorValue } ) }
								allowReset
							/>
							<RangeControl
								label={ __( "Overlay Opacity" ) }
								value={ overlayOpacity }
								onChange={ ( value ) => setAttributes( { overlayOpacity: value } ) }
								min={ 0 }
								max={ 100 }
								allowReset
							/>
							<ToggleControl
								label={ __( "Link Complete Box" ) }
								checked={ linkBox }
								onChange={ ( value ) => setAttributes( { linkBox: ! linkBox } ) }
							/>
						</Fragment>
					}
				</PanelBody>
				<PanelBody title={ __( "Content" ) } initialOpen={ false }>
					<ToggleControl
						label={ __( "Show Author" ) }
						checked={ displayPostAuthor }
						onChange={ ( value ) => setAttributes( { displayPostAuthor: ! displayPostAuthor } ) }
					/>
					<ToggleControl
						label={ __( "Show Date" ) }
						checked={ displayPostDate }
						onChange={ ( value ) => setAttributes( { displayPostDate : ! displayPostDate } ) }
					/>
					<ToggleControl
						label={ __( "Show Comment" ) }
						checked={ displayPostComment }
						onChange={ ( value ) => setAttributes( { displayPostComment: ! displayPostComment } ) }
					/>
					<ToggleControl
						label={ __( "Show Excerpt" ) }
						checked={ displayPostExcerpt }
						onChange={ ( value ) => setAttributes( { displayPostExcerpt: ! displayPostExcerpt } ) }
					/>
					{ displayPostExcerpt &&
						<RangeControl
							label={ __( "Excerpt Length" ) }
							value={ excerptLength }
							onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
							min={ 1 }
							max={ 50 }
							allowReset
						/>
					}
				</PanelBody>
				<PanelBody title={ __( "Read More Link" ) } initialOpen={ false }>
					<ToggleControl
						label={ __( "Show Read More Link" ) }
						checked={ displayPostLink }
						onChange={ ( value ) => setAttributes( { displayPostLink : ! displayPostLink } ) }
					/>
					<ToggleControl
						label={ __( "Open links in New Tab" ) }
						checked={ newTab }
						onChange={ ( value ) => setAttributes( { newTab : ! newTab } ) }
					/>
					{ displayPostLink &&
						<Fragment>
							<hr className="uagb-editor__separator" />
							<h2>{ __( "Button Text" ) }</h2>
							<TextControl
								label= { __( "Text" ) }
								value= { ctaText }
								onChange={ value => setAttributes( { ctaText: value } ) }
							/>
							<TypographyControl
								label={ __( "CTA Tag" ) }
								attributes = { attributes }
								setAttributes = { setAttributes }
								loadGoogleFonts = { { value: ctaLoadGoogleFonts, label: __( "ctaLoadGoogleFonts" ) } }
								fontFamily = { { value: ctaFontFamily, label: __( "ctaFontFamily" ) } }
								fontWeight = { { value: ctaFontWeight, label: __( "ctaFontWeight" ) } }
								fontSubset = { { value: ctaFontSubset, label: __( "ctaFontSubset" ) } }
								fontSizeType = { { value: ctaFontSizeType, label: __( "ctaFontSizeType" ) } }
								fontSize = { { value: ctaFontSize, label: __( "ctaFontSize" ) } }
								fontSizeMobile = { { value: ctaFontSizeMobile, label: __( "ctaFontSizeMobile" ) } }
								fontSizeTablet= { { value: ctaFontSizeTablet, label: __( "ctaFontSizeTablet" ) } }
								lineHeightType = { { value: ctaLineHeightType, label: __( "ctaLineHeightType" ) } }
								lineHeight = { { value: ctaLineHeight, label: __( "ctaLineHeight" ) } }
								lineHeightMobile = { { value: ctaLineHeightMobile, label: __( "ctaLineHeightMobile" ) } }
								lineHeightTablet= { { value: ctaLineHeightTablet, label: __( "ctaLineHeightTablet" ) } }
							/>
							<hr className="uagb-editor__separator" />
							<h2>{ __( "Button Border" ) }</h2>
							<SelectControl
								label={ __( "Style" ) }
								value={ borderStyle }
								onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
								options={ [
									{ value: "none", label: __( "None" ) },
									{ value: "solid", label: __( "Solid" ) },
									{ value: "dashed", label: __( "Dashed" ) },
									{ value: "dotted", label: __( "Dotted" ) },
									{ value: "double", label: __( "Double" ) },
								] }
							/>
							<RangeControl
								label={ __( "Width" ) }
								value={ borderWidth }
								onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
								min={ 0 }
								max={ 10 }
								allowReset
							/>
							<RangeControl
								label={ __( "Rounded Corner" ) }
								value={ borderRadius }
								onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<hr className="uagb-editor__separator" />
							<h2>{ __( "Button Padding (px)" ) }</h2>
							<RangeControl
								label={ UAGB_Block_Icons.vertical_spacing }
								className={ "uagb-margin-control" }
								value={ btnVPadding }
								onChange={ ( value ) => setAttributes( { btnVPadding: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<RangeControl
								label={ UAGB_Block_Icons.horizontal_spacing }
								className={ "uagb-margin-control" }
								value={ btnHPadding }
								onChange={ ( value ) => setAttributes( { btnHPadding: value } ) }
								min={ 0 }
								max={ 50 }
								allowReset
							/>
							<hr className="uagb-editor__separator" />
							<h2>{ __( "Button Colors" ) }</h2>
							<TabPanel className="uagb-inspect-tabs uagb-inspect-tabs-col-2"
								activeClass="active-tab"
								tabs={ [
									{
										name: "normal",
										title: __( "Normal" ),
										className: "uagb-normal-tab",
									},
									{
										name: "hover",
										title: __( "Hover" ),
										className: "uagb-hover-tab",
									},
								] }>
								{
									( tabName ) => {
										let tabout
										if ( "hover" === tabName.name ){
											tabout = hoverSettings
										} else {
											tabout = normalSettings
										}
										return <div>{ tabout }</div>
									}
								}
							</TabPanel>
						</Fragment>
					}
				</PanelBody>
				<PanelBody title={ __( "Typography" ) } initialOpen={ false }>
					<SelectControl
						label={ __( "Title Tag" ) }
						value={ titleTag }
						onChange={ ( value ) => setAttributes( { titleTag: value } ) }
						options={ [
							{ value: "h1", label: __( "H1" ) },
							{ value: "h2", label: __( "H2" ) },
							{ value: "h3", label: __( "H3" ) },
							{ value: "h4", label: __( "H4" ) },
							{ value: "h5", label: __( "H5" ) },
							{ value: "h6", label: __( "H6" ) },
						] }
					/>
					<TypographyControl
						label={ __( "Title Tag" ) }
						attributes = { attributes }
						setAttributes = { setAttributes }
						loadGoogleFonts = { { value: titleLoadGoogleFonts, label: __( "titleLoadGoogleFonts" ) } }
						fontFamily = { { value: titleFontFamily, label: __( "titleFontFamily" ) } }
						fontWeight = { { value: titleFontWeight, label: __( "titleFontWeight" ) } }
						fontSubset = { { value: titleFontSubset, label: __( "titleFontSubset" ) } }
						fontSizeType = { { value: titleFontSizeType, label: __( "titleFontSizeType" ) } }
						fontSize = { { value: titleFontSize, label: __( "titleFontSize" ) } }
						fontSizeMobile = { { value: titleFontSizeMobile, label: __( "titleFontSizeMobile" ) } }
						fontSizeTablet= { { value: titleFontSizeTablet, label: __( "titleFontSizeTablet" ) } }
						lineHeightType = { { value: titleLineHeightType, label: __( "titleLineHeightType" ) } }
						lineHeight = { { value: titleLineHeight, label: __( "titleLineHeight" ) } }
						lineHeightMobile = { { value: titleLineHeightMobile, label: __( "titleLineHeightMobile" ) } }
						lineHeightTablet= { { value: titleLineHeightTablet, label: __( "titleLineHeightTablet" ) } }
					/>	
					{ ( displayPostAuthor || displayPostDate || displayPostComment ) && <Fragment>
						<hr className="uagb-editor__separator" />				
						<h2>{ __( "Meta" ) }</h2>
						<TypographyControl
							label={ __( "Meta Tag" ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: metaLoadGoogleFonts, label: __( "metaLoadGoogleFonts" ) } }
							fontFamily = { { value: metaFontFamily, label: __( "metaFontFamily" ) } }
							fontWeight = { { value: metaFontWeight, label: __( "metaFontWeight" ) } }
							fontSubset = { { value: metaFontSubset, label: __( "metaFontSubset" ) } }
							fontSizeType = { { value: metaFontSizeType, label: __( "metaFontSizeType" ) } }
							fontSize = { { value: metaFontSize, label: __( "metaFontSize" ) } }
							fontSizeMobile = { { value: metaFontSizeMobile, label: __( "metaFontSizeMobile" ) } }
							fontSizeTablet= { { value: metaFontSizeTablet, label: __( "metaFontSizeTablet" ) } }
							lineHeightType = { { value: metaLineHeightType, label: __( "metaLineHeightType" ) } }
							lineHeight = { { value: metaLineHeight, label: __( "metaLineHeight" ) } }
							lineHeightMobile = { { value: metaLineHeightMobile, label: __( "metaLineHeightMobile" ) } }
							lineHeightTablet= { { value: metaLineHeightTablet, label: __( "metaLineHeightTablet" ) } }
						/>
					</Fragment>						
					}

					{ displayPostExcerpt && <Fragment>
						<hr className="uagb-editor__separator" />				
						<h2>{ __( "Excerpt" ) }</h2>
						<TypographyControl
							label={ __( "Excerpt Tag" ) }
							attributes = { attributes }
							setAttributes = { setAttributes }
							loadGoogleFonts = { { value: excerptLoadGoogleFonts, label: __( "excerptLoadGoogleFonts" ) } }
							fontFamily = { { value: excerptFontFamily, label: __( "excerptFontFamily" ) } }
							fontWeight = { { value: excerptFontWeight, label: __( "excerptFontWeight" ) } }
							fontSubset = { { value: excerptFontSubset, label: __( "excerptFontSubset" ) } }
							fontSizeType = { { value: excerptFontSizeType, label: __( "excerptFontSizeType" ) } }
							fontSize = { { value: excerptFontSize, label: __( "excerptFontSize" ) } }
							fontSizeMobile = { { value: excerptFontSizeMobile, label: __( "excerptFontSizeMobile" ) } }
							fontSizeTablet= { { value: excerptFontSizeTablet, label: __( "excerptFontSizeTablet" ) } }
							lineHeightType = { { value: excerptLineHeightType, label: __( "excerptLineHeightType" ) } }
							lineHeight = { { value: excerptLineHeight, label: __( "excerptLineHeight" ) } }
							lineHeightMobile = { { value: excerptLineHeightMobile, label: __( "excerptLineHeightMobile" ) } }
							lineHeightTablet= { { value: excerptLineHeightTablet, label: __( "excerptLineHeightTablet" ) } }
						/>
					</Fragment>						
					}
				</PanelBody>

				<PanelBody title={ __( "Colors" ) } initialOpen={ false }>
					{ imgPosition == "top" &&
						<Fragment>
							<p className="uagb-setting-label">{ __( "Blog Background Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: bgColor }} ></span></span></p>
							<ColorPalette
								value={ bgColor }
								onChange={ ( colorValue ) => setAttributes( { bgColor: colorValue } ) }
								allowReset
							/>
						</Fragment>
					}
					<Fragment>
						<p className="uagb-setting-label">{ __( "Title Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: titleColor }} ></span></span></p>
						<ColorPalette
							value={ titleColor }
							onChange={ ( colorValue ) => setAttributes( { titleColor: colorValue } ) }
							allowReset
						/>
					</Fragment>
					<Fragment>
						<p className="uagb-setting-label">{ __( "Meta Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: metaColor }} ></span></span></p>
						<ColorPalette
							value={ metaColor }
							onChange={ ( colorValue ) => setAttributes( { metaColor: colorValue } ) }
						/>
					</Fragment>
					{ displayPostExcerpt == true &&
						<Fragment>
							<p className="uagb-setting-label">{ __( "Excerpt Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: excerptColor }} ></span></span></p>
							<ColorPalette
								value={ excerptColor }
								onChange={ ( colorValue ) => setAttributes( { excerptColor: colorValue } ) }
								allowReset
							/>
						</Fragment>
					}
					<p className="uagb-setting-label">{ __( "Arrows & Dots Color" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: arrowColor }} ></span></span></p>
					<ColorPalette
						value={ arrowColor }
						onChange={ ( colorValue ) => setAttributes( { arrowColor: colorValue } ) }
						allowReset
					/>
				</PanelBody>
				<PanelBody title={ __( "Spacing" ) } initialOpen={ false }>
					<RangeControl
						label={ __( "Row Gap" ) }
						value={ rowGap }
						onChange={ ( value ) => setAttributes( { rowGap: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __( "Gap Between Posts & Dots" ) }
						value={ columnGap }
						onChange={ ( value ) => setAttributes( { columnGap: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
					<RangeControl
						label={ __( "Content Padding" ) }
						value={ contentPadding }
						onChange={ ( value ) => setAttributes( { contentPadding: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __( "Content Padding (Mobile)" ) }
						value={ contentPaddingMobile }
						onChange={ ( value ) => setAttributes( { contentPaddingMobile: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<hr className="uagb-editor__separator" />
					<RangeControl
						label={ __( "Title Bottom Spacing" ) }
						value={ titleBottomSpace }
						onChange={ ( value ) => setAttributes( { titleBottomSpace: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __( "Meta Bottom Spacing" ) }
						value={ metaBottomSpace }
						onChange={ ( value ) => setAttributes( { metaBottomSpace: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
					<RangeControl
						label={ __( "Excerpt Bottom Spacing" ) }
						value={ excerptBottomSpace }
						onChange={ ( value ) => setAttributes( { excerptBottomSpace: value } ) }
						min={ 0 }
						max={ 50 }
						allowReset
					/>
				</PanelBody>
			</InspectorControls>
		)

		var element = document.getElementById( "uagb-post-carousel-style-" + this.props.clientId )

		let css = ""

		if( null != element && "undefined" != typeof element ) {
			css = styling( this.props, "uagb-post__carousel" )
			css += "#uagb-post__carousel-" + this.props.clientId + ".uagb-post-grid ul.slick-dots li.slick-active button:before, #uagb-post__carousel-" + this.props.clientId + ".uagb-slick-carousel ul.slick-dots li button:before { color: " + arrowColor + "; }"
			element.innerHTML = css
		}

		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length

		if ( ! hasPosts ) {
			return (
				<Fragment>
					{ inspectorControls }
					<Placeholder
						icon="admin-post"
						label={ uagb_blocks_info.blocks["uagb/post-carousel"]["title"] }
					>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							__( "No posts found." )
						}
					</Placeholder>
				</Fragment>
			)
		}

		return (
			<Fragment>
				{ inspectorControls }
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) => {
							setAttributes( { align: value } )
						} }
						controls={ [ "left", "center", "right" ] }
					/>
				</BlockControls>
				<Blog attributes={attributes} className={this.props.className} latestPosts={latestPosts} block_id={this.props.clientId}/>
				{ loadTitleGoogleFonts }
				{ loadMetaGoogleFonts }
				{ loadExcerptGoogleFonts }
				{ loadCtaGoogleFonts }
			</Fragment>
		)
	}
}

export default withSelect( ( select, props ) => {
	const { categories, postsToShow, order, orderBy } = props.attributes
	const { getEntityRecords } = select( "core" )
	const latestPostsQuery = pickBy( {
		categories: categories,
		order: order,
		orderby: orderBy,
		per_page: postsToShow,
	}, ( value ) => ! isUndefined( value ) )
	const categoriesListQuery = {
		per_page: 100,
	}
	return {
		latestPosts: getEntityRecords( "postType", "post", latestPostsQuery ),
		categoriesList: getEntityRecords( "taxonomy", "category", categoriesListQuery ),
	}
} )( UAGBPostCarousel )