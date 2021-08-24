import React from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import MailchimpCustomForm from "./mailchimpCustomForm"

const MailchimpFormContainer = () => {
  const postUrl = `https://eightbranches.us2.list-manage.com/subscribe/post?u=74c6e4091afb59459404cc84f&id=84c8a06c28`
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
