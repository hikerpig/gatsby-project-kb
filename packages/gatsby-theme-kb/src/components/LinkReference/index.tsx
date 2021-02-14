import { Link } from 'gatsby';
import { Reference } from '../../type'
import React from 'react';

import './link-reference.css'

const LinkReference = (props: { reference: Reference}) => {
  const { reference } = props
  const { slug, title } = reference.referrer.parent?.fields!

  return (
    <div className="link-reference">
      <Link to={slug}>
        {title}
      </Link>
      <div className="link-refernce__context" dangerouslySetInnerHTML={{ __html: reference.contextLine }} />
    </div>
  );
}

export default LinkReference;
