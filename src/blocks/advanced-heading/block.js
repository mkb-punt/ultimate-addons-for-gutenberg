/**
 * BLOCK: Advanced Heading
 */

import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import deprecated from "./deprecated"
import "./style.scss"

const { __ } = wp.i18n

const {
	registerBlockType ,createBlock
} = wp.blocks

registerBlockType( "uagb/advanced-heading", {

	title: uagb_blocks_info.blocks["uagb/advanced-heading"]["title"],
	description: uagb_blocks_info.blocks["uagb/advanced-heading"]["description"],
	icon: UAGB_Block_Icons.advanced_heading,
	keywords: [
		__( "advanced heading" ),
		__( "uag" ),
		__( "heading" ),
	],
	supports: {
		anchor: true,
	},
	example: {
		attributes: {
			headingTitle: __( 'Write a Heading' ),
			headingDesc: __( 'Write a Description' ),
		},
	},
	category: uagb_blocks_info.category,
	attributes,
	edit,
	save,
	deprecated,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/heading'],
				transform: (attributes) => {
					return createBlock('uagb/advanced-heading', {
						headingTitle: attributes.content,
						headingAlign:attributes.align,
						className:'uagb-heading-text'
					})
				}
			},
			{
				type: 'block',
				blocks: ['core/list'],
				transform: (attributes) => {
					return createBlock('uagb/advanced-heading', {
						headingTitle: attributes.values,
						className:'uagb-heading-text'
					})
				}
			},
			{
				type: 'block',
				blocks: ['core/quote'],
				transform: (attributes) => {
					return createBlock('uagb/advanced-heading', {
						headingTitle: attributes.value,
						headingDesc: attributes.citation,
						className:'uagb-heading-text'
					})
				}
			}
		],
		to: [
			{
				type: 'block',
				blocks: ['core/heading'],
				transform: (attributes) => {
					return createBlock('core/heading', {
						content: attributes.headingTitle,
						align:attributes.headingAlign,
						className:'uagb-heading-text'
					})
				}
			},
			{
				type: 'block',
				blocks: ['core/list'],
				transform: (attributes) => {
					return createBlock('core/list', {
						values: attributes.headingTitle,
						className:'uagb-heading-text'
					})
				}
			},
			{
				type: 'block',
				blocks: ['core/quote'],
				transform: (attributes) => {
					return createBlock('core/quote', {
						value: attributes.headingTitle,
						citation: attributes.headingDesc,
						className:'uagb-heading-text'
					})
				}
			}
		]
	},
} )