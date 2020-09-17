// This file is part of React-Invenio-Deposit
// Copyright (C) 2020 CERN.
// Copyright (C) 2020 Northwestern University.
//
// React-Invenio-Deposit is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import _get from 'lodash/get';

export class APIErrorHandler {
  /**
   * Return Formik error object of keys (dotted paths to fields) and values
   * (error message)
   *
   * @param {Error} error - Axios error
   * @param {object} formik - Formik object
   */
  extractErrors(error, formik) {
    debugger;
    let frontendErrors = { message: _get(error, "response.data.message", "") };
    const backendErrors = _get(error, "response.data.errors", []);
    for (const fieldError of backendErrors) {
      this.updateFrontendErrors(frontendErrors, fieldError);
    }
    console.log("Frontend errors", frontendErrors);
    return frontendErrors;
  }

  /**
   * Update frontendErrors object with error entry (key value pair)
   *
   * @param {object} frontendErrors
   * @param {object} backendFieldError
   */
  updateFrontendErrors(frontendErrors, backendFieldError) {
    let dottedPath = backendFieldError.field;
    const arrayPath = dottedPath.split(".");

    // only consider metadata.<rest of path> errors
    if (arrayPath.length < 2 || arrayPath[0] !== "metadata") {
      return;
    }

    // Generate the frontend appropriate dotted path
    switch (arrayPath[1]) {
      case "identifiers":
        console.log("do something special for this case");
        // dottedPath = "..."
        break;

      default:
        dottedPath = arrayPath.slice(1).join(".");
        break;
    }

    frontendErrors[dottedPath] = backendFieldError.messages.join("<br/>");
  }
}
