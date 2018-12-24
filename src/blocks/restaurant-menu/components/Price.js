const {
	RichText,
} = wp.editor

const { __ } = wp.i18n

const {
	createBlock
} = wp.blocks

class Price extends React.Component {

	render() {

		const {	
			attributes, 
			setAttributes , 
			props,
			index_value	
		} = this.props

		const rest_arr = attributes.rest_menu_item_arr[index_value]
		let price = ""
		if( rest_arr && typeof rest_arr !== "undefined"){
			price = rest_arr["price"]			
		}

		var data_copy = [...attributes.rest_menu_item_arr]
		
		if( setAttributes !== "not_set" ){
			return (
				<RichText
	                tagName= 'span'
	                value={ price }
	                className = 'uagb-rm__price'
	                onChange={ ( value ) => { 
	                	var new_title = { "description" : data_copy[index_value]["description"], "title":data_copy[index_value]["title"], "price" : value, "image" : data_copy[index_value]["image"]  }
						data_copy[index_value] = new_title
						setAttributes( { "rest_menu_item_arr": data_copy } )

	                	const newItems = attributes.rest_menu_item_arr.map( ( item, thisIndex ) => {
							if ( thisIndex === index_value ) {
								item["price"] = value				
							}
							return item			
						} )
	                	setAttributes( {
							rest_menu_item_arr: newItems,
						} )	
	                } }     
	                multiline={ false }
	                placeholder={ __( "Write a Heading" ) }
	                onMerge = { props.mergeBlocks }		
	                unstableOnSplit = {
						props.insertBlocksAfter ?
							( before, after, ...blocks ) => {
								setAttributes( { content: before } )
								props.insertBlocksAfter( [
									...blocks,
									createBlock( "core/paragraph", { content: after } ),
								] )
							} :
							undefined
					}			
					onRemove={ () => props.onReplace( [] ) }              
	            />			
			)
		}else{
			return (
				<RichText.Content
	                tagName= 'span'
	                value={ price }
	                className='uagb-rm__price'
	            />			
			)
		}
	}
}

export default Price
