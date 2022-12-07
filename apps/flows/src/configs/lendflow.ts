import { FlowsConfig } from '..';

export const config: FlowsConfig = {
  id: 'lendflow',
  brand: {
    name: 'Lendflow',
  },
  flows: [{
    id: 'api-introduction',
    description: '',
    name: 'API Introduction',
    blocks: [{
      type: 'markdown',
      value: 'A Business Credit Application can be created via Widget or API call. In order to create a business application via API call, you must use the Apply for Business Credit endpoint. You can find this and all our endpoints on our Postman Collection (Lendflow API docs).\n\nAll of our endpoints use headers which act as a source of extra information for each API call you make. The headers we use are the following\n- Authorization: Carries credentials that authenticate a user-agent with a server\n- Content-Type: Indicates the media type of the resource\n- Content-Length: Indicates the size of the data in the body\n- Host: Specifies the host and port number of the server the request is being sent\n- User-Agent: String that lets servers identify the application, operating system, vendor, and/or version of the requesting agent\n- Accept: Indicates the content types the client can understand\n- Accept-Encoding: Indicates the content encoding that the client can understand\n- Connection: Controls whether the network connection stays open after the current transaction finishes\n- Content-Type: Indicates the media type of the resource, setting the MIME type to application/json\n- Accept: Indicates the content types the client can understand, setting the MIME type to application/json'
    }, {
      type: 'markdown',
      value: 'TODO: '
    }, {
      type: 'markdown',
      value: 'The first step would be to obtain your Bearer Token for authorization using the Get Bearer Token endpoint, using the specified path (https://api.lendflow.com/api/v1/auth/login), and your Lendflow email and password on the body. The response will return an access token that you can use for authorization purposes as well as an expiration timer (in seconds)'
    }]
  }, {
    id: 'apply-for-business-credit',
    description: '',
    name: 'Apply for Business Credit',
    blocks: [/*{
      type: 'markdown',
      value: 'This flow is a starting point for '
    },*/{
      type: 'markdown',
      value: '# Fetch an Access Token\nTo get started, you\'ll need to fetch a Bearer Token for authorization the request below.\n\nThe request body accepts your Lendflow email and password. The response will return an access token that you can use for authorization purposes as well as an expiration timer (in seconds).'
    }, {
      type: 'request',
      value: {
        requestId: 'login',
        referenceBy: 'login',
      }
    }, {
      type: 'markdown',
      value: '# Apply for Business Credit\nFill the information on the required fields and you make the API call, the response will contain an application_id or UUID which will be useful to track the credit application on the Lendflow dashboard, as well as a path parameter for future API calls for a specific application'
    }, {
      type: 'request',
      value: {
        requestId: 'business-credit-application',
        referenceBy: 'businessCreditApplication'
      }
    }]
  }],
  environments: [{
    id: 'mock',
    name: 'Mock API',
    type: 'mock',
    host: 'https://api.lendflow.com/api/v1'
  }, {
    id: 'production',
    name: 'Production API',
    type: 'live',
    host: 'https://api.lendflow.com/api/v1'
  }],
  constants: [],
  requests: [{
    id: 'login',
    method: 'POST',
    path: '/auth/login',
    params: {
      body: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' }
        },
        required: ['email', 'password'],
      },
      headers: {
        type: 'object',
        properties: {
          'Content-Type': { type: 'string', const: 'application/json' },
          Accept: { type: 'string', const: 'application/json' },
        },
        required: ['Content-Type', 'Accept'],
      }
    },
    response: {
      body: {
        type: 'object',
        properties: {
          access_token: { type: 'string' },
          token_type: { type: 'string', const: 'bearer' },
          expires_in: { type: 'number', const: 7200 },
        },
        required: ['access_token', 'token_type', 'expires_in'],
      },
      headers: {
        type: 'object',
        properties: {
          status: { type: 'number', const: 200 },
        },
        required: ['status']
      }
    }
  }, {
    id: 'business-credit-application',
    method: 'POST',
    path: '/applications/business_credit',
    params: {
      body: {
        "type": "object",
        "properties": {
        "basic_info": {
          "type": "object",
          "description": "",
          "example": [],
          "properties": {
            "first_name": {
              "type": "string",
              "description": "",
              "example": "John"
            },
            "last_name": {
              "type": "string",
              "description": "",
              "example": "Doe"
            },
            "email_address": {
              "type": "string",
              "description": "Must be a valid email address.",
              "example": "john@doe.com"
            },
            "telephone": {
              "type": "string",
              "description": "",
              "example": "2025550152"
            },
            "doing_business_as": {
              "type": "string",
              "description": "",
              "example": "CEO"
            },
            "date_of_birth": {
              "type": "string",
              "description": "Must be a valid date in the format <code>Y-m-d</code>.",
              "example": "1990-05-26"
            },
            "ownership_percentage": {
              "type": "number",
              "description": "Must be at least 0.01. Must not be greater than 100.",
              "example": 50
            }
          }
        },
        "business_address": {
          "type": "object",
          "description": "",
          "example": [],
          "properties": {
            "address_line": {
              "type": "string",
              "description": "",
              "example": "20 Hudson Yards"
            },
            "address_line2": {
              "type": "string",
              "description": "",
              "example": ""
            },
            "city": {
              "type": "string",
              "description": "Must not be greater than 50 characters.",
              "example": "New York"
            },
            "state": {
              "type": "string",
              "description": "Two-letter state code.",
              "example": "NY"
            },
            "country": {
              "type": "string",
              "description": "Two-letter country code.",
              "example": "US"
            },
            "zip": {
              "type": "string",
              "description": "Must be between 5-9 digits. Must not be greater than 50 characters.",
              "example": "10001"
            }
          }
        },
        "business_start_date": {
          "type": "string",
          "description": "Business start date using format YYYY-MM-DD . Must be a valid date in the format <code>Y-m-d</code>.",
          "example": "2001-05-26"
        },
        "business_entity": {
          "type": "string",
          "description": "The value must be one of: <br /><code>business_entity_type_1</code> (LLC)<br/><code>business_entity_type_2</code> (Sole Proprietorship)<br/><code>business_entity_type_3</code> (Partnership)<br/><code>business_entity_type_4</code> (Corporation)<br/><code>business_entity_type_41</code> (Cooperative)<br/><code>business_entity_type_5</code> (Non-profit)<br/><code>business_entity_type_6</code> (I’m not sure)<br/><code>business_entity_type_7</code> (I haven’t registered it yet)<br/><code>business_entity_type_8</code> (Joint Venture).",
          "example": "business_entity_type_1"
        },
        "business_legal_name": {
          "type": "string",
          "description": "",
          "example": "John Doe LLC"
        },
        "employee_identification_number": {
          "type": "string",
          "description": "",
          "example": "123456789"
        },
        "social_security_number": {
          "type": "string",
          "description": "",
          "example": "123456789"
        },
        "country_of_citizenship": {
          "type": "string",
          "description": "",
          "example": null
        },
        "individual_taxpayer_identification_number": {
          "type": "string",
          "description": "",
          "example": "987654321"
        },
        "terms_of_service": {
          "type": "boolean",
          "description": "Do you accept our terms of service.",
          "example": false
        },
        "requested_products": {
          "type": "array",
          "description": "Must be one of <code>experian_uccs</code>, <code>experian_bankruptcies</code>, <code>experian_judgments</code>, <code>experian_liens</code>, <code>experian_intelliscore</code>, <code>experian_intelliscore_v3</code>, <code>experian_fsr</code>, <code>experian_fsr_v2</code>, <code>experian_commercial_collections</code>, <code>experian_credit_status</code>, <code>experian_legal_collections</code>, <code>experian_trades</code>, <code>experian_corporate_registrations</code>, <code>experian_business_contacts</code>, <code>experian_business_facts</code>, <code>experian_fraud_shields</code>, <code>experian_business_match</code>, <code>experian_gdn_company_profile</code>, <code>experian_gdn_risk_check</code>, <code>experian_gdn_small_report</code>, <code>experian_gdn_extended_report</code>, <code>experian_gdn_canadian_profile_report</code>, <code>experian_bop_blended_prequalification</code>, <code>experian_bop_commercial_lending_to_a_sole_prop</code>, <code>experian_bop_commercial_lending_with_a_pg</code>, <code>experian_bop_commercial_insurance</code>, <code>experian_bop_merchant_cash_advance</code>, <code>experian_bop_merchant_acquisition</code>, <code>experian_bop_commercial_factoring</code>, <code>experian_bop_blended_account_review</code>, <code>experian_bop_commercial_collections</code>, <code>equifax_business_principal_report</code>, <code>dnb_cer_l1</code>, <code>dnb_ci_l2</code>, <code>dnb_pi_l3</code>, <code>dnb_fi_l2</code>, <code>dnb_fi_l3</code>, <code>dnb_fi_l4</code>, <code>dnb_dti_l1</code>, <code>dnb_bm_l1</code>, <code>enigma_match</code>, <code>enigma_lookup</code>, <code>clear</code>, <code>clear_id_confirm_person</code>, <code>clear_risk_inform_person_search</code>, <code>clear_risk_inform_person_report</code>, <code>clear_id_confirm_business</code>, <code>clear_risk_inform_business_search</code>, <code>clear_risk_inform_business_report</code>, <code>clear_court_search</code>, <code>clear_adverse_media_search</code>, <code>clear_adverse_media_report</code>, <code>sentilink</code>, <code>sentilink_dob_completion</code>, <code>sentilink_ssn_completion</code>, <code>plaid</code>, <code>plaid_asset_report</code>, <code>socure_dv</code>, <code>socure_kyc</code>, <code>socure_fraud</code>, <code>lexis_nexis_kyc</code>, <code>lexis_nexis_kyc_report</code>, <code>lexis_nexis_kyb_search</code>, <code>lexis_nexis_kyb_report</code>, <code>lexis_nexis_corporate_filing_search</code>, <code>lexis_nexis_corporate_filing_report</code>, <code>lexis_nexis_ucc_filing_search</code>, <code>lexis_nexis_ucc_filing_report</code>, <code>lexis_nexis_bankruptcy_search</code>, <code>lexis_nexis_bankruptcy_report</code>, <code>lexis_nexis_liens_and_judgment_search</code>, <code>lexis_nexis_liens_report</code>, <code>lexis_nexis_judgments_report</code>, <code>middesk</code>, <code>heron</code>, <code>persona</code>, <code>inscribe</code>, <code>ekata</code>, <code>scorely</code>, <code>ocrolus_cfa</code>, <code>ntropy</code>, <code>railz</code>, <code>codat</code>, <code>mx</code>, or <code>rutter</code>.",
          "example": [
            "lexis_nexis_liens_report",
            "ntropy"
          ],
          "items": {
            "type": "string"
          }
        },
        "client_tracking_token": {
          "type": "string",
          "description": "Must not be greater than 50 characters.",
          "example": "vmqeopfuudtdsufvyvddqamniihfqcoynlazghdtq"
        },
        "tracking_tokens": {
          "type": "array",
          "description": "",
          "example": [
            null
          ],
          "items": {
            "type": "string"
          }
        },
        "bank_statements": {
          "type": "array",
          "description": "",
          "example": [
            []
          ],
          "items": {
            "type": "object",
            "properties": {
              // "file": {
              //   "type": "string",
              //   "format": "binary",
              //   "description": "A bank statement. Must be a PDF, JPG, PNG, BMP, or GIF. This field is required when <code>bank_statements</code> is present.  Must be a file. Must not be greater than 51200 kilobytes."
              // },
              "type": {
                "type": "string",
                "description": "Identifier for the type of bank statement provided. The value must be one of: <br /><code>bank_statements_1</code> (Bank statement for January)<br/><code>bank_statements_2</code> (Bank statement for February)<br/><code>bank_statements_3</code> (Bank statement for March)<br/><code>bank_statements_4</code> (Bank statement for April)<br/><code>bank_statements_5</code> (Bank statement for May)<br/><code>bank_statements_6</code> (Bank statement for June)<br/><code>bank_statements_7</code> (Bank statement for July)<br/><code>bank_statements_8</code> (Bank statement for August)<br/><code>bank_statements_9</code> (Bank statement for September)<br/><code>bank_statements_10</code> (Bank statement for October)<br/><code>bank_statements_11</code> (Bank statement for November)<br/><code>bank_statements_12</code> (Bank statement for December). This field is required when <code>bank_statements</code> is present.  Must be one of <code>bank_statements_1</code>, <code>bank_statements_2</code>, <code>bank_statements_3</code>, <code>bank_statements_4</code>, <code>bank_statements_5</code>, <code>bank_statements_6</code>, <code>bank_statements_7</code>, <code>bank_statements_8</code>, <code>bank_statements_9</code>, <code>bank_statements_10</code>, <code>bank_statements_11</code>, or <code>bank_statements_12</code>.",
                "example": "bank_statements_4"
              },
            }
          }
        },
        "personal_address": {
          "type": "object",
          "description": "",
          "example": [],
          "properties": {
            "address_line": {
              "type": "string",
              "description": "This field is required when <code>personal_address</code> is present.",
              "example": "20 Hudson Yards"
            },
            "address_line2": {
              "type": "string",
              "description": "",
              "example": "Suite 500"
            },
            "city": {
              "type": "string",
              "description": "This field is required when <code>personal_address</code> is present. Must not be greater than 50 characters.",
              "example": "New York"
            },
            "state": {
              "type": "string",
              "description": "This field is required when <code>personal_address</code> is present.",
              "example": "NY"
            },
            "country": {
              "type": "string",
              "description": "Two-letter country code. This field is required when <code>personal_address</code> is present.",
              "example": "US"
            },
            "zip": {
              "type": "string",
              "description": "Must be between 5-9 digits. This field is required when <code>personal_address</code> is present. Must not be greater than 50 characters.",
              "example": "10001"
            }
          }
        },
        "data_orchestration_template_id": {
          "type": "string",
          "description": "",
          "example": null
        },
        "document_verifications": {
          "type": "array",
          "description": "",
          "example": [
            []
          ],
          "items": {
            "type": "object",
            "properties": {
              "service": {
                "type": "string",
                "description": "Must be one of <code>persona</code>, <code>inscribe</code>, or <code>socure_dv</code>.",
                "example": "persona"
              }
            },
            "required": [
              "service"
            ]
          }
        },
        "other_owners": {
          "type": "array",
          "description": "",
          "example": [
            []
          ],
          "items": {
            "type": "object",
            "properties": {
              "first_name": {
                "type": "string",
                "description": "Must not be greater than 50 characters.",
                "example": "John"
              },
              "last_name": {
                "type": "string",
                "description": "Must not be greater than 50 characters.",
                "example": "Doe"
              },
              "email_address": {
                "type": "string",
                "description": "Must be a valid email address.",
                "example": "qkunze@example.com"
              },
              "address": {
                "type": "string",
                "description": "",
                "example": "25th Street 121"
              },
              "country": {
                "type": "string",
                "description": "",
                "example": "US"
              },
              "city": {
                "type": "string",
                "description": "Must not be greater than 50 characters.",
                "example": "New York"
              },
              "state": {
                "type": "string",
                "description": "",
                "example": "NY"
              },
              "zip": {
                "type": "string",
                "description": "",
                "example": "10001"
              },
              "ssn": {
                "type": "string",
                "description": "",
                "example": "123456789"
              },
              "dob": {
                "type": "string",
                "description": "Must be a valid date. Must be a date before <code>-18 years</code>.",
                "example": "2002-08-30"
              },
              "ownership": {
                "type": "number",
                "description": "Must be at least 0.01. Must not be greater than 100.",
                "example": 50
              },
              "country_of_citizenship": {
                "type": "string",
                "description": "",
                "example": null
              }
            },
            "required": [
              "first_name",
              "last_name",
              "email_address",
              "address",
              "city",
              "state",
              "zip",
              "ssn",
              "dob",
              "ownership"
            ]
          }
        },
        "widget_template_id": {
          "type": "string",
          "description": "",
          "example": null
        },
        "widget_type": {
          "type": "string",
          "description": "Must be one of <code>1</code>, <code>10</code>, <code>9</code>, <code>2</code>, <code>3</code>, <code>4</code>, <code>8</code>, <code>5</code>, <code>7</code>, <code>13</code>, <code>14</code>, <code>22</code>, <code>23</code>, <code>15</code>, <code>16</code>, <code>17</code>, <code>18</code>, <code>19</code>, <code>20</code>, <code>21</code>, <code>24</code>, <code>25</code>, or <code>26</code>.",
          "example": "17"
        },
        "plaid_data": {
          "type": "array",
          "description": "Plaid JSON from transactions/get.",
          "example": {
            "accounts": [
              {
                "mask": "0000",
                "name": "Plaid Checking",
                "type": "depository",
                "subtype": "checking",
                "balances": {
                  "limit": null,
                  "current": 110,
                  "available": 100,
                  "iso_currency_code": "USD",
                  "unofficial_currency_code": null
                },
                "account_id": "8r8K5P6NlXIQqJLB8w8nfLGPmj8Q8MFwG5aGk",
                "official_name": "Plaid Gold Standard 0% Interest Checking"
              }
            ],
            "transactions": [
              {
                "date": "2021-04-12",
                "name": "United Airlines",
                "amount": 220.42,
                "pending": false,
                "category": [
                  "Travel",
                  "Airlines and Aviation Services"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "EQgePW78jXTZ9x7EmkmVhR9DpZl6lkuX1zQ1W",
                "category_id": "22001000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": "United Airlines",
                "transaction_id": "pBdwjmgq14H9jVg1WEWDiMdRjRBAKzILWegNa",
                "authorized_date": null,
                "payment_channel": "in store",
                "transaction_code": null,
                "transaction_type": "special",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-02-14",
                "name": "Uber 072515 SF**POOL**",
                "amount": 6.41,
                "pending": false,
                "category": [
                  "Travel",
                  "Taxi"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "EQgePW78jXTZ9x7EmkmVhR9DpZl6lkuX1zQ1W",
                "category_id": "22016000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": "Uber",
                "transaction_id": "PldzgArK8VTrsGlp19b9Vhk7818ryNwU79jdeb",
                "authorized_date": null,
                "payment_channel": "in store",
                "transaction_code": null,
                "transaction_type": "special",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-02-11",
                "name": "Uber 072515 SF**POOL**",
                "amount": 14.2,
                "pending": false,
                "category": [
                  "Travel",
                  "Taxi"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "EQgePW78jXTZ9x7EmkmVhR9DpZl6lkuX1zQ1W",
                "category_id": "22016000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": "Uber",
                "transaction_id": "PldzgArK8VTrsGlp19b9Vhk7818ryNwU79jdec",
                "authorized_date": null,
                "payment_channel": "in store",
                "transaction_code": null,
                "transaction_type": "special",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-01-25",
                "name": "United Airlines",
                "amount": 500,
                "pending": false,
                "category": [
                  "Travel",
                  "Airlines and Aviation Services"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "APvNdW1LaXhg9r5v3K34in53GAXqXru1dMwlg",
                "category_id": "22001000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": "United Airlines",
                "transaction_id": "pBdwjmgq14H9jVg1WEWDiMdRjRBAKzILWegNJ",
                "authorized_date": null,
                "payment_channel": "in store",
                "transaction_code": null,
                "transaction_type": "special",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-01-23",
                "name": "Uber 072515 SF**POOL**",
                "amount": 6.31,
                "pending": false,
                "category": [
                  "Travel",
                  "Taxi"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "8r8K5P6NlXIQqJLB8w8nfLGPmj8Q8MFwG5aGk",
                "category_id": "22016000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": "Uber",
                "transaction_id": "PldzgArK8VTrGlp19b9Vhk7818ryNwU79jdrd",
                "authorized_date": null,
                "payment_channel": "in store",
                "transaction_code": null,
                "transaction_type": "special",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-01-24",
                "name": "INTRST PYMNT",
                "amount": -4.22,
                "pending": false,
                "category": [
                  "Transfer",
                  "Credit"
                ],
                "datetime": null,
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "8r8K5P6NlXIQqJLB8w8nfLGPmj8Q8MFwG5aGk",
                "category_id": "21005000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": null,
                "transaction_id": "5ABGL8EAXgs9DQj3W7gmhW3nB5rEWKRfxq7XlL",
                "authorized_date": null,
                "payment_channel": "other",
                "transaction_code": null,
                "transaction_type": "special",
                "iso_currency_code": "USD",
                "authorized_datetime": null,
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-01-25",
                "name": "Uber 072515 SF**POOL**",
                "amount": 6.33,
                "pending": false,
                "category": [
                  "Travel",
                  "Taxi"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "8r8K5P6NlXIQqJLB8w8nfLGPmj8Q8MFwG5aGk",
                "category_id": "22016000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": "Uber",
                "transaction_id": "PldzgArK8VTrGlp19b9Vhk7818ryNwU79jded",
                "authorized_date": null,
                "payment_channel": "in store",
                "transaction_code": null,
                "transaction_type": "special",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-01-26",
                "name": "Uber 072515 SF**POOL**",
                "amount": 200,
                "pending": false,
                "category": [
                  "Travel",
                  "Taxi"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "8r8K5P6NlXIQqJLB8w8nfLGPmj8Q8MFwG5aGk",
                "category_id": "22016000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": "Uber",
                "transaction_id": "PldzgArK8VTrsGlp19b9Vhk7818ryNwU79jded",
                "authorized_date": null,
                "payment_channel": "in store",
                "transaction_code": null,
                "transaction_type": "special",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-01-26",
                "name": "Uber 072515 SF**POOL**",
                "amount": 200,
                "pending": false,
                "category": [
                  "Travel",
                  "Taxi"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "8r8K5P6NlXIQqJLB8w8nfLGPmj8Q8MFwG5aGk",
                "category_id": "22016000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": "Uber",
                "transaction_id": "PldzgArK8VTrsGlp19b9Vshk7818ryNwU79jded",
                "authorized_date": null,
                "payment_channel": "in store",
                "transaction_code": null,
                "transaction_type": "special",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-01-20",
                "name": "Tectra Inc",
                "amount": 500,
                "pending": false,
                "category": [
                  "Food and Drink",
                  "Restaurants"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "APvNdW1LaXhg9r5v3K34in53GAXqXru1dMwlg",
                "category_id": "13005000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": "Tectra Inc",
                "transaction_id": "ozkEPoblMaHJeE9y6G61IepmKmVoBrURzA9nk",
                "authorized_date": null,
                "payment_channel": "in store",
                "transaction_code": null,
                "transaction_type": "place",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-01-19",
                "name": "AUTOMATIC PAYMENT - THANK",
                "amount": 2078.5,
                "pending": false,
                "category": [
                  "Payment"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "APvNdW1LaXhg9r5v3K34in53GAXqXru1dMwlg",
                "category_id": "16000000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": null,
                "transaction_id": "EQgePW78jXTZ9x7EmkmVhR9DXDQbgwFX1zQPr",
                "authorized_date": null,
                "payment_channel": "other",
                "transaction_code": null,
                "transaction_type": "special",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-04-13",
                "name": "Pay day?",
                "amount": -1000,
                "pending": false,
                "category": [
                  "Travel",
                  "Airlines and Aviation Services"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "De97NGogPXsajWVpmEmBcwJEqyo8obivkdexx",
                "category_id": "22001000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": "my work",
                "transaction_id": "pBdwjmgq14H9jVg1WEWDiMdRjRBAKzIL9999z",
                "authorized_date": null,
                "payment_channel": "in store",
                "transaction_code": null,
                "transaction_type": "place",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-04-12",
                "name": "Meal for 1",
                "amount": 220.42,
                "pending": false,
                "category": [
                  "Travel",
                  "Airlines and Aviation Services"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "De97NGogPXsajWVpmEmBcwJEqyo8obivkdexx",
                "category_id": "22001000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": "Shake Shak",
                "transaction_id": "pBdwjmgq14H9jVg1WEWDiMdRjRBAKzIL9999a",
                "authorized_date": null,
                "payment_channel": "in store",
                "transaction_code": null,
                "transaction_type": "place",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-04-09",
                "name": "Gas",
                "amount": 43,
                "pending": false,
                "category": [
                  "Travel",
                  "Airlines and Aviation Services"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "De97NGogPXsajWVpmEmBcwJEqyo8obivkdexx",
                "category_id": "22001000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": "Texaco",
                "transaction_id": "pBdwjmgq14H9jVg1WEWDiMdRjRBAKzIL9999b",
                "authorized_date": null,
                "payment_channel": "in store",
                "transaction_code": null,
                "transaction_type": "place",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-04-09",
                "name": "Groceries",
                "amount": 100,
                "pending": false,
                "category": [
                  "Travel",
                  "Airlines and Aviation Services"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "De97NGogPXsajWVpmEmBcwJEqyo8obivkdexx",
                "category_id": "22001000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": "Stop & Shop",
                "transaction_id": "pBdwjmgq14H9jVg1WEWDiMdRjRBAKzIL9999c",
                "authorized_date": null,
                "payment_channel": "in store",
                "transaction_code": null,
                "transaction_type": "place",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              },
              {
                "date": "2021-04-07",
                "name": "Groceries",
                "amount": -800,
                "pending": false,
                "category": [
                  "Travel",
                  "Airlines and Aviation Services"
                ],
                "location": {
                  "lat": null,
                  "lon": null,
                  "city": null,
                  "region": null,
                  "address": null,
                  "country": null,
                  "postal_code": null,
                  "store_number": null
                },
                "account_id": "De97NGogPXsajWVpmEmBcwJEqyo8obivkdexx",
                "category_id": "22001000",
                "payment_meta": {
                  "payee": null,
                  "payer": null,
                  "ppd_id": null,
                  "reason": null,
                  "by_order_of": null,
                  "payment_method": null,
                  "reference_number": null,
                  "payment_processor": null
                },
                "account_owner": null,
                "merchant_name": "Stop & Shop",
                "transaction_id": "pBdwjmgq14H9jVg1WEWDiMdRjRBAKzIL9999d",
                "authorized_date": null,
                "payment_channel": "in store",
                "transaction_code": null,
                "transaction_type": "place",
                "iso_currency_code": "USD",
                "pending_transaction_id": null,
                "unofficial_currency_code": null
              }
            ],
            "total_transactions": 16
          },
          "items": {
            "type": "string"
          }
        },
        "plaid": {
          "type": "object",
          "description": "",
          "example": [],
          "properties": {
            "transactions": {
              "type": "array",
              "description": "",
              "example": [
                "consequatur"
              ],
              "items": {
                "type": "string"
              }
            },
            "asset_report": {
              "type": "array",
              "description": "",
              "example": [
                "consequatur"
              ],
              "items": {
                "type": "string"
              }
            }
          }
        }
      },
      "required": [
        "business_entity",
        "business_legal_name",
        "terms_of_service"
      ],
      additionalProperties: false,
      },
      headers: {
        type: 'object',
        properties: {
          'Content-Type': { type: 'string', const: 'application/json' },
          Accept: { type: 'string', const: 'application/json' },
        },
        required: ['Content-Type', 'Accept'],
      }
    },
    response: {
      body: {
        type: 'object',
        properties: {
          access_token: { type: 'string' },
          token_type: { type: 'string', const: 'bearer' },
          expires_in: { type: 'number', const: 7200 },
        },
        required: ['access_token', 'token_type', 'expires_in'],
      },
      headers: {
        type: 'object',
        properties: {
          status: { type: 'number', const: 200 },
        },
        required: ['status']
      }
    }
  }]
}