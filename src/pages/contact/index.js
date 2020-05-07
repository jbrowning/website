/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3'
import Layout from '../../components/layout'
import { Form, FormGroup, FormLabel } from '~components/common/form'

const reasons = [
  'I want to report an issue with your data',
  'I want to report an issue with the website or web accessibility',
  'I have questions about state data grades',
  'I have feedback on the COVID Racial Data Tracker',
  "I'm a journalist with a media inquiry",
  'Something else!',
]

export default ({ data }) => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    loadReCaptcha(data.site.siteMetadata.recaptchaKey)
  }, [])

  return (
    <Layout
      title="Contact"
      description="The COVID Tracking Project runs on the effort and diligence of hundreds of volunteers, and we welcome your contribution."
      narrow
      textHeavy
    >
      <div
        className="module-content"
        dangerouslySetInnerHTML={{
          __html:
            data.allContentfulSnippet.edges[0].node
              .childContentfulSnippetContentTextNode.childMarkdownRemark.html,
        }}
      />
      <Form>
        <form
          method="POST"
          name="fa-form-1"
          action="https://webhook.frontapp.com/forms/c3c09a5603c02d2b7f86/KU--_qKvaSkUZHR2T92KQZ8hy5TatxTkRexeSE4NtpFltSVYROQxxbkIdSNH3RcHlZUI4RGGlHL7NwDr00Ki8WMFSOoBBMmgZ28PppSbXx-SQVi51ogAj28bbn6M"
          encType="multipart/form-data"
          acceptCharset="utf-8"
        >
          <FormGroup>
            <FormLabel htmlFor="contact-reason">
              What are you contacting us about?
            </FormLabel>
            <select id="fontact-reason" name="reason">
              {reasons.map(reason => (
                <option value={reason}>{reason}</option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="contact-name">Your name</FormLabel>
            <input type="text" name="name" id="contact-name" />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="contact-email">Your email address</FormLabel>
            <input type="email" name="email" id="contact-email" />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="contact-message">Message</FormLabel>
            <textarea name="message" id="contact-message" />
          </FormGroup>
          <FormGroup>
            <ReCaptcha sitekey={data.site.siteMetadata.recaptchaKey} />
          </FormGroup>
          <FormGroup>
            <button type="submit">Contact us</button>
          </FormGroup>
        </form>
      </Form>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        recaptchaKey
      }
    }
    allContentfulSnippet(filter: { slug: { eq: "contact-page-form" } }) {
      edges {
        node {
          childContentfulSnippetContentTextNode {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
