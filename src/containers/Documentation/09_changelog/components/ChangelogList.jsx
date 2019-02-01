/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

const ResourcesLinks = () => (
  <Card className="card--not-full-height">
    <CardBody className="documentation__changelog">
      <div className="card__title">
        <h5 className="bold-text">v1.4.0</h5>
        <h5 className="subhead">17-October-2018</h5>
      </div>
      <ul>
        <li>Added a seed without redux</li>
        <li>Renamed containers</li>
        <li>Redesign TopbarSearch</li>
        <li>Minor bug and styles fixes</li>
        <li>Update packages</li>
      </ul>
      <div className="card__title">
        <h5 className="bold-text">v1.3.7</h5>
        <h5 className="subhead">02-October-2018</h5>
      </div>
      <ul>
        <li>Updated project core to latest create-react-app</li>
      </ul>
      <div className="card__title">
        <h5 className="bold-text">v1.3.6</h5>
        <h5 className="subhead">25-September-2018</h5>
      </div>
      <ul>
        <li>Added filter button to <Link to="/tables/material_table">Material Table</Link></li>
        <li>Updated landing page</li>
        <li>Some file structure changes</li>
        <li>Minor bug fixes</li>
      </ul>
      <div className="card__title">
        <h5 className="bold-text">v1.3.5</h5>
        <h5 className="subhead">18-September-2018</h5>
      </div>
      <ul>
        <li>Added <Link to="/tables/material_table">Material Table</Link></li>
        <li>Updated packages</li>
      </ul>
      <div className="card__title">
        <h5 className="bold-text">v1.3.4</h5>
        <h5 className="subhead">07-September-2018</h5>
      </div>
      <ul>
        <li>Redesigned <Link to="/mail">Mail Application</Link></li>
        <li>Reworked and fixed layout: fixed sidebar highlighting and notification error in layout</li>
        <li>Minor bug fixes</li>
        <li>Minor styles changes</li>
      </ul>
      <div className="card__title">
        <h5 className="bold-text">v1.3.3</h5>
        <h5 className="subhead">23-August-2018</h5>
      </div>
      <ul>
        <li>Added multilanguage</li>
        <li>Added <a href="https://github.com/gaearon/react-hot-loader">react-hot-loader</a></li>
      </ul>
      <div className="card__title">
        <h5 className="bold-text">v1.3.2</h5>
        <h5 className="subhead">03-August-2018</h5>
      </div>
      <ul>
        <li>Redesigned Chat</li>
        <li>Reworked notifications</li>
        <li>Added welcome notification</li>
      </ul>
      <div className="card__title">
        <h5 className="bold-text">v1.3.1</h5>
        <h5 className="subhead">20-July-2018</h5>
      </div>
      <ul>
        <li>Updated Material-UI to v1.4.0</li>
        <li>Updated versions of other packages</li>
        <li>Added new page: <Link to="/account/email_confirmation">Email Confirmation</Link></li>
        <li>Added lists of messages and notifications to topbar</li>
        <li>Changed next components: TopbarProfile, Modal</li>
        <li>Renamed folder 'pages' to 'containers'</li>
        <li>Minor bug and style fixes</li>
      </ul>
      <div className="card__title">
        <h5 className="bold-text">v1.3.0</h5>
        <h5 className="subhead">05-July-2018</h5>
      </div>
      <ul>
        <li>Added seed project</li>
        <li>Minor fixes</li>
      </ul>
      <div className="card__title">
        <h5 className="bold-text">v1.2.1</h5>
        <h5 className="subhead">25-June-2018</h5>
      </div>
      <ul>
        <li>Included landing page in main files</li>
      </ul>
      <div className="card__title">
        <h5 className="bold-text">v1.2.0</h5>
        <h5 className="subhead">20-June-2018</h5>
      </div>
      <ul>
        <li>Changed the Timepicker from react-times to rc-time-picker</li>
        <li>The warning related with src/app/Router.js was fixed</li>
        <li>Changed the structure of custom fields in src/components/form</li>
        <li>Made the theme customizer</li>
        <li>Excluded the topbar and sidebar to a separated folder  (/src/pages/_layout)</li>
        <li>Top-menu was added</li>
      </ul>
      <div className="card__title">
        <h5 className="bold-text">v1.1.1</h5>
        <h5 className="subhead">06-June-2018</h5>
      </div>
      <ul>
        <li>Separated the sidebar logic on mobile and desktop</li>
        <li>Minor bugs fixes</li>
      </ul>
      <div className="card__title">
        <h5 className="bold-text">v1.1.0</h5>
        <h5 className="subhead">02-June-2018</h5>
      </div>
      <ul>
        <li>Editable tables added</li>
        <li>Minor bugs fixes</li>
      </ul>
      <div className="card__title">
        <h5 className="bold-text">v1.0.0</h5>
        <h5 className="subhead">31-May-2018</h5>
      </div>
      <ul>
        <li>Initial Release</li>
      </ul>
    </CardBody>
  </Card>
);

export default ResourcesLinks;
