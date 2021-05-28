import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

class Copy extends React.Component {
  state = {
    value: this.props.text,
    copied: false,
  }

  handleCopy = () => {
    this.setState({ copied: true })
    setTimeout(() => {
      this.setState({ copied: false })
    }, 3000)
  }

  render() {
    return (
      <>
        {this.state.copied ? <span className="copied">Copied!</span> : null}
        <CopyToClipboard text={this.state.value} onCopy={this.handleCopy}>
          <span title="Click to copy" style={{ cursor: 'pointer' }}>
            {this.props.children}
          </span>
        </CopyToClipboard>
      </>
    )
  }
}

export default Copy
