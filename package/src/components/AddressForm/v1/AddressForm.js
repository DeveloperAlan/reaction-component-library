import React, { Component } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash.uniqueid";
import { Form } from "reacto-form";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";
import { applyTheme, CustomPropTypes, getRequiredValidator } from "../../../utils";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColFull = styled.div`
  flex: 1 1 100%;
`;

const ColHalf = styled.div`
  flex: 1 1 100%;

  @media (${applyTheme("bp_sm")}) {
    flex: 0 1 calc(50% - 9px);
  }
`;

class AddressForm extends Component {
  static propTypes = {
    /**
     * If you've set up a components context using @reactioncommerce/components-context
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      /**
       * Pass either the Reaction ErrorsBlock component or your own component that is
       * compatible with ReactoForm.
       */
      ErrorsBlock: CustomPropTypes.component.isRequired,
      /**
       * Pass either the Reaction Field component or your own component that is
       * compatible with ReactoForm.
       */
      Field: CustomPropTypes.component.isRequired,
      /**
       * Pass either the Reaction TextInput component or your own component that is
       * compatible with ReactoForm.
       */
      TextInput: CustomPropTypes.component.isRequired,
      /**
       * Pass either the Reaction Select component or your own component that is
       * compatible with ReactoForm.
       */
      Select: CustomPropTypes.component.isRequired,
      /**
       * Pass either the Reaction PhoneNumberInput component or your own component that is
       * compatible with ReactoForm.
       */
      PhoneNumberInput: CustomPropTypes.component.isRequired
    }).isRequired,
    /**
     * Country options
     */
    countries: PropTypes.arrayOf(PropTypes.shape({
      /**
         * Country option label ("United States", "Nigeria")
         */
      label: PropTypes.string,
      /**
         * Country option value ("US", "NU")
         */
      value: PropTypes.string
    })),
    /**
     * Errors array
     */
    errors: PropTypes.arrayOf(PropTypes.shape({
      /**
         * Error message
         */
      message: PropTypes.string.isRequired,
      /**
         * Error name
         */
      name: PropTypes.string.isRequired
    })),
    /**
     * Form name
     */
    name: PropTypes.string,
    /**
     * Cancel event callback
     */
    onCancel: PropTypes.func,
    /**
     * Country change event callback, used to fetch new list of regions if country has changed.
     */
    onCountryChange: PropTypes.func,
    /**
     * Form submit event callback
     */
    onSubmit: PropTypes.func,
    /**
     * Region options
     */
    regions: PropTypes.arrayOf(PropTypes.shape({
      /**
         * Region option label ("Louisiana", "California")
         */
      label: PropTypes.string,
      /**
         * Region option value ("LA", "CA")
         */
      value: PropTypes.string
    })),
    /**
     * Validator method
     */
    validator: PropTypes.func,
    /**
     * Address object to be edited
     */
    value: PropTypes.shape({
      address1: PropTypes.string,
      address2: PropTypes.string,
      country: PropTypes.string,
      city: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      postal: PropTypes.string,
      region: PropTypes.string,
      phone: PropTypes.string
    })
  };

  static defaultProps = {
    errors: [],
    name: "address",
    onCancel() {},
    onCountryChange() {},
    onSubmit() {},
    validator: getRequiredValidator(
      "country",
      "firstName",
      "lastName",
      "address1",
      "city",
      "phone",
      "postal",
      "region"
    ),
    value: {
      address1: "",
      address2: "",
      country: "",
      city: "",
      firstName: "",
      lastName: "",
      postal: "",
      region: "",
      phone: ""
    }
  };

  state = {};

  _form = null;

  uniqueInstanceIdentifier = uniqueId("AddressForm_");

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  render() {
    const {
      value,
      components: {
        ErrorsBlock,
        Field,
        TextInput,
        Select,
        PhoneNumberInput
      },
      countries,
      errors,
      name,
      regions,
      validator
    } = this.props;

    const countryInputId = `country_${this.uniqueInstanceIdentifier}`;
    const firstNameInputId = `firstName_${this.uniqueInstanceIdentifier}`;
    const lastNameInputId = `lastName_${this.uniqueInstanceIdentifier}`;
    const address1InputId = `address1_${this.uniqueInstanceIdentifier}`;
    const address2InputId = `address2_${this.uniqueInstanceIdentifier}`;
    const cityInputId = `city_${this.uniqueInstanceIdentifier}`;
    const regionInputId = `region_${this.uniqueInstanceIdentifier}`;
    const postalInputId = `postal_${this.uniqueInstanceIdentifier}`;
    const phoneInputId = `phone_${this.uniqueInstanceIdentifier}`;

    return (
      <Form
        ref={(formEl) => {
          this._form = formEl;
        }}
        errors={errors}
        name={name}
        onSubmit={this.props.onSubmit}
        validator={validator}
        value={value}
      >
        <Grid>
          <ColFull>
            <Field name="country" label="Country" labelFor={countryInputId} isRequired>
              <Select
                id={countryInputId}
                isSearchable
                name="country"
                onChange={this.props.onCountryChange}
                options={countries}
                placeholder="Country"
              />
              <ErrorsBlock names={["country"]} />
            </Field>
          </ColFull>

          <ColHalf>
            <Field name="firstName" label="First Name" labelFor={firstNameInputId} isRequired>
              <TextInput id={firstNameInputId} name="firstName" placeholder="First Name" />
              <ErrorsBlock names={["firstName"]} />
            </Field>
          </ColHalf>
          <ColHalf>
            <Field name="lastName" label="Last Name" labelFor={lastNameInputId} isRequired>
              <TextInput id={lastNameInputId} name="lastName" placeholder="Last Name" />
              <ErrorsBlock names={["lastName"]} />
            </Field>
          </ColHalf>

          <ColFull>
            <Field name="address1" label="Address" labelFor={address1InputId} isRequired>
              <TextInput id={address1InputId} name="address1" placeholder="Address" />
              <ErrorsBlock names={["address1"]} />
            </Field>
          </ColFull>

          <ColFull>
            <Field name="address2" label="Address Line 2" labelFor={address2InputId} isOptional>
              <TextInput id={address2InputId} name="address2" placeholder="Address Line 2 (Optional)" />
            </Field>
          </ColFull>

          <ColFull>
            <Field name="city" label="City" labelFor={cityInputId}>
              <TextInput id={cityInputId} name="city" placeholder="City" />
              <ErrorsBlock names={["city"]} />
            </Field>
          </ColFull>

          <ColHalf>
            <Field name="region" label="Region" labelFor={regionInputId} isRequired>
              {regions && regions.length > 1 ? (
                <Select
                  id={regionInputId}
                  isSearchable
                  name="region"
                  options={regions}
                  placeholder="Region"
                />
              ) : (
                <TextInput id={regionInputId} name="region" placeholder="Region" />
              )}
              <ErrorsBlock names={["region"]} />
            </Field>
          </ColHalf>
          <ColHalf>
            <Field name="postal" label="Postal Code" labelFor={postalInputId} isRequired>
              <TextInput id={postalInputId} name="postal" placeholder="Postal Code" />
              <ErrorsBlock names={["postal"]} />
            </Field>
          </ColHalf>

          <ColFull>
            <Field name="phone" label="Phone" labelFor={phoneInputId} isRequired>
              <PhoneNumberInput id={phoneInputId} name="phone" placeholder="Phone" />
              <ErrorsBlock names={["phone"]} />
            </Field>
          </ColFull>
        </Grid>
      </Form>
    );
  }
}

export default withComponents(AddressForm);