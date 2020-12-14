/**
* BLOCK: Forms - Radio - Save Block
*/

import classnames from "classnames"

const { __ } = wp.i18n
const { RichText } = wp.blockEditor
const {	Fragment } = wp.element

export default function save( props ) {
	
	const { attributes } = props
	
	const {
		block_id,
		radioRequired,
		options,
		radioName
	} = attributes
	
	const isRequired = (radioRequired) ? "required" : "";
	
	return (
		<div className={ classnames(
			"uagb-forms-radio-wrap",
			"uagb-forms-field-set",
			`uagb-block-${ block_id }`,
			) }>
			<RichText.Content
			tagName="div"
			value={ radioName }
			className={`uagb-forms-radio-label ${isRequired} uagb-forms-input-label`}
			id={ block_id }		
			/>
			
			{options.map((o, index) => {
				var optionvalue = o.optionvalue;
				var value = optionvalue.replace(/\s+/g, '-').toLowerCase();
				return (
					<Fragment>
					<input type="radio" id={ value } name={ block_id } value={ optionvalue } required={ radioRequired } />
					<label for={ value }>{o.optiontitle}</label><br/>						
					</Fragment>
				);
			})}
								
		</div>
	)
}