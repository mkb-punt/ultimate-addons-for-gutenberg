/**
 * BLOCK: Forms - Name
 */

import UAGB_Block_Icons from "../../../../../dist/blocks/uagb-controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import save from "./save"
import "./style.scss"
import "./editor.scss"


const { __ } = wp.i18n

const {
	registerBlockType
} = wp.blocks

registerBlockType( "uagb/forms-email", {
	title: uagb_blocks_info.blocks["uagb/forms-email"]["title"],
	description: uagb_blocks_info.blocks["uagb/forms-email"]["description"],
	icon: UAGB_Block_Icons.faq,
	category: uagb_blocks_info.category,
	parent: [ "uagb/forms" ],
	attributes,
	edit,
	supports: {
		anchor: true,
	},
	save
} )