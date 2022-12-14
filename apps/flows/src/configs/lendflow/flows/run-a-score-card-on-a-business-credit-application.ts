import { Flow } from "../../..";
import { lendflow6Image } from "../images/lendflow6";

export const runAScoreCardOnABusinessCreditApplication: Flow = {
  id: 'run-a-score-card-on-a-business-credit-application',
  name: 'Run a Score Card on a Business Credit Application',
  description: '',
  blocks: [{
    type: 'markdown',
    value: '# Run a Score Card\nIn order to run a Score Card on a deal you can use the Run Specific (or all) score cards against a Deal, with your application id on the path, and input the desired Scored Card id as the score_card_ids on the body. After you make the call the response will contain a true or false value, letting you know if the service has started.'
  }, {
    type: 'request',
    value: {
      requestId: 'placeholder',
      referenceBy: 'placeholder',
    }
  }, {
    type: 'markdown',
    value: 'Once a true value is returned, the Score Card selected will begin and you will be able to see the deal changes on the Lendflow Dashboard.\n\nYou can find your Score Card templates and their IDs on your Profile → Underwriting → Scorecards. Here you can manage your Score Cards (duplicate, delete, edit) or create new ones using the “New Template” button:'
  }, {
    type: 'image',
    value: { base64: lendflow6Image },
  }, {
    type: 'markdown',
    value: '# Fetch Score Card Results\nIt is possible to see the Score Cards results via API call as well, calling the Get score-card results, inputting the Score Card id on the path. When a successful call is made you will get the specific card details as well as the different deal ids it has been used on, with the corresponding results to each deal.'
  }, {
    type: 'request',
    value: {
      requestId: 'placeholder',
      referenceBy: 'placeholder',
    }
  }, {
    type: 'markdown',
    value: 'The response will contain information for the score card such as id, name, description, points, category attributes, and knockout conditions for each of your categories.\n\n # Fetch All Score Cards Results\nYou can also list all the Score Cards available to your organization by calling the List all score-cards endpoint, inputting a search string if desired, and a sort by option (the available sort options are: name, points, runs_count). Once you make the call you will receive a response with all the cards that fit your search keyword, if no search keyword is entered, all available cards will be listed.'
  }, {
    type: 'request',
    value: {
      requestId: 'placeholder',
      referenceBy: 'placeholder',
    }
  }, {
    type: 'markdown',
    value: 'The response will also contain the id, description, points, and categories for every listed card.'
  }, {
    type: 'markdown',
    value: '# Placement Stage\nOnce the desired Score Cards are run a deal, you can proceed into the Placements stage where the deal will be sent to different Lenders and you can begin receiving offers for the deal.'
  }],
}