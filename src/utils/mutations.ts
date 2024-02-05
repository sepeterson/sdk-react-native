import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation Signup($instanceId: String!) {
    signup(instanceId: $instanceId) {
      instanceId
      userId
      password
    }
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation Signin(
    $instanceId: String!
    $appId: String!
    $authorId: String!
    $authType: AuthType!
    $authToken: String
    $password: String
    $contextId: String
  ) {
    signin(
      instanceId: $instanceId
      appId: $appId
      authorId: $authorId
      authType: $authType
      authToken: $authToken
      password: $password
      contextId: $contextId
    ) {
      result {
        token
        conversationId
        sendReferral
      }
      errors
    }
  }
`;

export const SEND_REFERRAL_MUTATION = gql`
  mutation SendReferral($conversationId: String!, $referralId: String!) {
    sendReferral(conversationId: $conversationId, referralId: $referralId) {
      id
      author {
        userId
      }
      time
      payload {
        ... on Referral {
          referralId
        }
      }
      status
      userInput
    }
  }
`;

export const SEND_TEXT_MUTATION = gql`
  mutation SendText($conversationId: String!, $text: String!) {
    sendText(conversationId: $conversationId, text: $text) {
      id
      author {
        userId
      }
      time
      payload {
        ... on Text {
          value
        }
      }
      status
      userInput
    }
  }
`;

export const SEND_BUTTON_MUTATION = gql`
  mutation SendButtonMutation($conversationId: String!, $buttonId: String!) {
    sendButton(conversationId: $conversationId, buttonId: $buttonId) {
      id
      author {
        userId
      }
      time
      payload {
        ... on Button {
          buttonId
        }
      }
      status
    }
  }
`;

export const UPDATE_METADATA = gql`
  mutation UpdateMetadata(
    $conversationId: String!
    $firstName: String
    $lastName: String
    $name: String
    $phoneNumber: String
    $email: String
  ) {
    metadata(
      conversationId: $conversationId
      firstName: $firstName
      lastName: $lastName
      name: $name
      phoneNumber: $phoneNumber
      email: $email
    ) {
      errors
    }
  }
`;

export const READ_MUTATION = gql`
  mutation Read($time: Long!, $conversationId: String!) {
    read(time: $time, conversationId: $conversationId)
  }
`;

export const DELIVERED_MUTATION = gql`
  mutation Delivered($time: Long!, $conversationId: String!) {
    delivered(time: $time, conversationId: $conversationId)
  }
`;
