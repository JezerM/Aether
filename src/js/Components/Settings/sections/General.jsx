// SettingsGeneral -> Required by Components/Settings
// --------------------------------------
// Basic distro / visibility / date & time formatting settings.

import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';

import * as FileOperations from "Logic/FileOperations";
import { FormTextField } from "../inputs/TextField";
import { FormCheckbox } from "../inputs/Checkbox";


const onLogoChange = (props, e) => {
  props.dispatch({
    "type": 'SETTINGS_LOGO_CHANGE',
    "path": e.target.value
  });
};


const LogoChooser = (props) => {
  let logos = FileOperations.getLogos();
  let activeLogo = props.settings.distro;

  let items = logos.map((e) => {
    let [path, fileName] = e;

    return (
      <option key={ fileName } value={ path }>{ fileName.split(".")[0] }</option>
    );
  });

  let selectedItem = logos.filter((e) => (e[0] === activeLogo));
  selectedItem = selectedItem[0] || [""];

  return (
    <div>
      <div className="preview-logo">
        <img src={ selectedItem[0] } />
      </div>
      <select onChange={ onLogoChange.bind(this, props) } value={ activeLogo }>
        { items }
      </select>
    </div>
  );
};


LogoChooser.propTypes = {
  'settings': PropTypes.object.isRequired
};


export const GeneralSection = (props) => {
  const settings = props.settings;

  return (
    <div className="settings-general">
      <div className="left">
        { LogoChooser(props) }
      </div>
      <div className="right">
        <ul>
          <h4>Date & Time</h4>
          <hr />
          <FormCheckbox
            name={ "Date Enabled" }
            value={ settings.date_enabled }
            boundFunction={ props.settingsToggleBinary.bind(this, 'date_enabled') }
          />
          <FormTextField
            name={ "Date Format" }
            value={ settings.date_format }
            boundFunction={ props.settingsSetValue.bind(this, 'date_format') }
          />
          <FormCheckbox
            name={ "Time Enabled" }
            value={ settings.time_enabled }
            boundFunction={ props.settingsToggleBinary.bind(this, 'time_enabled') }
          />
          <FormTextField
            name={ "Time Format" }
            value={ settings.time_format }
            boundFunction={ props.settingsSetValue.bind(this, 'time_format') }
          />

          <h4>Command Visibility</h4>
          <hr />
          <FormCheckbox
            name={ "Shutdown Enabled" }
            value={ settings.command_shutdown_enabled }
            boundFunction={ props.settingsToggleBinary.bind(this, 'command_shutdown_enabled') }
          />
          <FormCheckbox
            name={ "Reboot Enabled" }
            value={ settings.command_reboot_enabled }
            boundFunction={ props.settingsToggleBinary.bind(this, 'command_reboot_enabled') }
          />
          <FormCheckbox
            name={ "Hibernate Enabled" }
            value={ settings.command_hibernate_enabled }
            boundFunction={ props.settingsToggleBinary.bind(this, 'command_hibernate_enabled') }
          />
          <FormCheckbox
            name={ "Sleep Enabled" }
            value={ settings.command_sleep_enabled }
            boundFunction={ props.settingsToggleBinary.bind(this, 'command_sleep_enabled') }
          />

          <h4>Avatar Visibility</h4>
          <hr />
          <FormCheckbox
            name={ "Avatar Enabled" }
            value={ settings.avatar_enabled }
            boundFunction={ props.settingsToggleBinary.bind(this, 'avatar_enabled') }
          />

          <FormCheckbox
            name={ "Background Enabled" }
            value= { settings.avatar_background_enabled }
            boundFunction={ props.settingsToggleBinary.bind(this, 'avatar_background_enabled') }
          />

          <h4>Hostname Visibility</h4>
          <hr />
          <FormCheckbox
            name={ "Hostname Enabled" }
            value={ settings.hostname_enabled }
            boundFunction={ props.settingsToggleBinary.bind(this, 'hostname_enabled') }
          />
        </ul>
      </div>
    </div>
  );
};


GeneralSection.propTypes = {
  'settings': PropTypes.object.isRequired,
  'settingsSetValue': PropTypes.func.isRequired,
  'settingsToggleBinary': PropTypes.func.isRequired
};


export default connect(
  (state) => {
    return {
      'settings': state.settings
    };
  },
  null
)(GeneralSection);