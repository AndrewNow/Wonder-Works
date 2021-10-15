import React from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import MailchimpCustomForm from "./mailchimpCustomForm"

const MailchimpFormContainer = () => {
  const postUrl = `https://wonderworks.us5.list-manage.com/subscribe/post?u=23ebb8f12c4a9c61292e47c3f&id=0d7009b8e7`
  //structure taken from here https://dev.to/gedalyakrycer/create-an-email-list-with-react-mailchimp-965
  return (
    <MailchimpSubscribe
      url={postUrl}
      render={({ subscribe, status, message }) => (
        <MailchimpCustomForm
          status={status}
          message={message}
          onValidated={formData => subscribe(formData)}
        />
      )}
    />
  )
}

export default MailchimpFormContainer
