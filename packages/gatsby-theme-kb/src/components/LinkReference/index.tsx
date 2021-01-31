import { Link } from 'gatsby';
import { Reference } from '../../type'
import React from 'react';

const LinkReference = (props: { reference: Reference}) => {
  const { reference } = props
  const { slug, title } = reference.parent?.fields!
  console.log('ref', reference)

  return (
    <div>
      <Link to={slug} className="topic__reference">
        {title}
      </Link>
      {/* <div dangerouslySetInnerHTML={{ __html: reference.previewHtml }} /> */}
    </div>
  );
}

export default LinkReference;
