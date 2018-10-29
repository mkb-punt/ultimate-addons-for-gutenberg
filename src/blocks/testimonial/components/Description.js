const {
    RichText,
} = wp.editor;

const { __ } = wp.i18n;

const {
	createBlock
} = wp.blocks

class Description extends React.Component {

	render() {

		const {	
			attributes, 
			setAttributes , 
			props		
		} = this.props;
			
		if( setAttributes !== 'not_set' ){
			return (
				<RichText
	                tagName='p'
	                value={ attributes.headingDesc }
	                className='uagb-testinomial-desc'
	                onChange={ ( value ) => setAttributes( { headingDesc: value } ) }     
	                onMerge = { props.mergeBlocks }		
	                onSplit = {
							props.insertBlocksAfter ?
								( before, after, ...blocks ) => {
									setAttributes( { content: before } );
									props.insertBlocksAfter( [
										...blocks,
										createBlock( 'core/paragraph', { content: after } ),
									] );
								} :
								undefined
						}			
					onRemove={ () => props.onReplace( [] ) }              
	            />			
			)
		}else{
			return (
				<RichText.Content
	                tagName='p'
	                value={ attributes.headingDesc }
	                className='uagb-testinomial-desc'
	            />			
			)
		}
	}
}

export default Description
