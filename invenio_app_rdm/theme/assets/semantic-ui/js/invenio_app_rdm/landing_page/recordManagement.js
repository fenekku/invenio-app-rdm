// This file is part of InvenioRDM
// Copyright (C) 2020-2021 CERN.
// Copyright (C) 2020-2021 Northwestern University.
// Copyright (C) 2021 Graz University of Technology.
//
// Invenio RDM Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import React from "react";
import axios from "axios";
import { Grid, Icon, Button } from "semantic-ui-react";


export const RecordManagement = (props) => {
  const recid = props.recid;
  const editRecord = () => {
    axios
      .post(`/api/records/${recid}/draft`)
      .then((response) => {
        window.location = `/uploads/${recid}`;
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <Grid relaxed>
      <Grid.Column>
        <Grid.Row>
          <Icon name="cogs" />
          <span>Manage</span>
        </Grid.Row>
        <Grid.Row className="record-management-buttons">
          <Button color="orange" size="mini" onClick={() => editRecord()}>
            <Icon name="edit" />
            Edit
          </Button>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};
