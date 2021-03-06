/**
 * BLOCK: Post Image
 */

// Import block dependencies and components
import {PostImage} from "./edit"
import save from "./save"
import UAGB_Block_Icons from "../../../../dist/blocks/uagb-controls/block-icons"
import "./editor.scss"
// Components
const { __ } = wp.i18n

// Register block controls
const { registerBlockType } = wp.blocks

// Register the block
registerBlockType( "uagb/post-image", {
	title: uagb_blocks_info.blocks["uagb/post-image"]["title"],
	description: uagb_blocks_info.blocks["uagb/post-image"]["description"],
	icon: UAGB_Block_Icons.post_grid,
	category: uagb_blocks_info.category,
	parent: [ "uagb/post-grid" ,"uagb/post-masonry" , "uagb/post-carousel" ],
	keywords: [
		__( "post" ),
		__( "image" ),
		__( "uag" ),
	],
	PostImage,
	example: {},
	save
} )
