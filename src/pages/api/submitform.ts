import client from "@sendgrid/mail";

client.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function post({ request, redirect }) {
  const data = await request.formData(); // Here's the data sent by the form
  // const text = data.get("text"); // Here's how you get the value of a field
  // console.log(text);

  const getLabelValuePairs = () => {
    const pairs = {
      availability: {},
      applyingFor: {},
      aopp: {},
      conf: {},
      ref: {},
      hbv: {},
      ehs: {},
      evr: {},
      edu: {},
      swd: {},
      mto: {},
      pd: {},
      ed: {},
      eh: {},
    };

    const formatKey = (key, label?) => {
      if (label) return label;

      /**let sanitizedKey = key.replace(
        /^(availability|aopp|conf|ref|hbv|ehs|evr|edu|swd|pd|ed|eh)/,
        ""
      );*/

      if (key === "aoppOne") {
        return "I acknowledge that I have received, read and understand the following policies and procedures and documents for:";
      }
      if (key === "aoppCompanyName") {
        return "I understand that __________ will not tolerate any employee, volunteer, board member or third party who commits sexual abuse. Disciplinary actions will be taken against those who are found to have committed sexual abuse.";
      }

      if (key.includes("signature")) {
        return (
          key.split(/(?=[A-Z])/).join(" ") +
          " | " +
          "Acknowledgement of legally binding signature."
        );
      }

      if (key.toLowerCase() === "swdqone") {
        return "Have you ever been convicted of a law violation(s) but excluding offenses committed before your eighteenth birthday which were finally adjudicated in a juvenile court or under a youth offender law?";
      }

      if (key.toLowerCase() === "swdqtwo") {
        return "Are you the subject of any pending criminal charges?";
      }

      if (key.toLowerCase() === "swdqthree") {
        return "I hereby affirm that the information provided on this form is true and correct, and I agree and understand that any falsification of information herein, regardless of time of discovery, may cause forfeiture on my part to any employment offered by this facility. I understand that all information on this form is subject to verification. I authorize: ________ to make an investigation to verify this information.";
      }

      if (key.toLowerCase() === "swdqonedesc") {
        return "Explanation of response:";
      }

      if (key.toLowerCase() === "swdqtwodesc") {
        return "Explanation of response:";
      }

      if (key.includes("ehOne")) {
        return key
          .replace("ehOne", "Employer #1:")
          .split(/(?=[A-Z])/)
          .join(" ");
      }
      if (key.includes("ehTwo")) {
        return key
          .replace("ehTwo", "Employer #2:")
          .split(/(?=[A-Z])/)
          .join(" ");
      }
      if (key.includes("ehThree")) {
        return key
          .replace("ehThree", "Employer #3:")
          .split(/(?=[A-Z])/)
          .join(" ");
      }

      if (key === "evrSentForms") {
        return "Please check this box once you have sent these forms in (or if you plan to email them to email@gmail.com, and understand that these forms are neccesary for your application to be considered).";
      }

      if (key === "hbvExplainer") {
        return "I understand that due to my occupational exposure to blood or other potentially infectious materials that it is strongly suggested that I am vaccinated for the Hepatitis B Virus (HBV). I understand that I may refuse the vaccination. I also understand that not being vaccinated may leave me susceptible to the HBV. ________ has explained to me that I continue to be at risk for HBV until such time that I am immunized, and that if I wish to be immunized I need to see my physician for the series of shots.";
      }

      if (key === "refReferenceAcknowledgement") {
        return "I acknowledge filing an application with ________ and authorize release of information from my former employer.";
      }

      if (key === "ehsBackBrace") {
        return "Have you ever worn a back brace?";
      }

      if (key === "ehsWorkersComp") {
        return "Have you ever received Worker's Compensation?";
      }

      if (key === "ehsInsuranceRefusal") {
        return "Have you ever been refused insurance for health reasons?";
      }

      if (key === "ehsMedicineIntake") {
        return "Do you take medicine regularly?";
      }

      if (key === "ehsRecentlyInstitutionalized") {
        return "Have you ever been a patient in a hospital or institution during the last three years?";
      }

      if (key === "ehsReceivedPension") {
        return "Have you ever received pension or disability insurance?";
      }

      if (key === "ehsRefusedEmployment") {
        return "Have you ever been refused employment for health?";
      }

      if (key === "ehsInterferingDiseases") {
        return "Do you have any defect, deformity, or disease that may interfere with your work?";
      }

      if (key === "ehsPhysicalHealth") {
        return "I am in good physical health.";
      }

      if (key === "ehsInfectious") {
        return "I am free from any communicable disease.";
      }

      if (key === "ehsConditionFree") {
        return "I am free from any physical or mental condition that would prevent me from fully performing my job duties as outlined in my job description";
      }

      if (key === "mtoName") {
        return "I, ________, have submitted documentation of PPD test results of said test.";
      }

      return key
        .split(/(?=[A-Z])/)
        .join(" ")
        .replace(/^(af|aopp|conf|ref|hbv|ehs|evr|edu|swd|pd|ed|eh)/, "");
    };

    const updatePairs = (section: string, entry) => {
      const label = formatKey(entry[0]);
      const value = entry[1];
      return (pairs[section][entry[0]] = {
        label,
        value: value ? value : "N/A",
      });
    };

    for (const entry of data.entries()) {
      if (entry[0].match(/^availability/)) {
        updatePairs("availability", entry);
      } else if (entry[0].match(/^aopp/)) {
        updatePairs("aopp", entry);
      } else if (entry[0].match(/^conf/)) {
        updatePairs("conf", entry);
      } else if (entry[0].match(/^hbv/)) {
        updatePairs("hbv", entry);
      } else if (entry[0].match(/^ehs/)) {
        updatePairs("ehs", entry);
      } else if (entry[0].match(/^evr/)) {
        updatePairs("evr", entry);
      } else if (entry[0].match(/^edu/)) {
        updatePairs("edu", entry);
      } else if (entry[0].match(/^swd/)) {
        updatePairs("swd", entry);
      } else if (entry[0].match(/^ref/)) {
        updatePairs("ref", entry);
      } else if (entry[0].match(/^pd/)) {
        updatePairs("pd", entry);
      } else if (entry[0].match(/^ed/)) {
        updatePairs("ed", entry);
      } else if (entry[0].match(/^eh/)) {
        updatePairs("eh", entry);
      } else if (entry[0].match(/^eh/)) {
        updatePairs("af", entry);
      }
    }

    return pairs;
  };

  const getEmailHTMLString = () => {
    const info = getLabelValuePairs();
    const sectionHTMLStrings: Array<string> = [];
    for (const section in info) {
      const currentSection = info[section];
      // Each section has its own div. this gets the section name, creates the div and heading

      const heading = (() => {
        switch (section) {
          case "availability":
            return "Availability Form Responses";
          case "aopp":
            return "Acknowledgement of Policies and Procedures Responses";
          case "conf":
            return "Confidentiality Agreement Responses";
          case "ref":
            return "Reference Letter Responses";
          case "hbv":
            return "Hepatitis B Vaccine Responses";
          case "ehs":
            return "Employee Health Self-Assessment Responses";
          case "evr":
            return "Employee Verification Requirements Responses";
          case "edu":
            return "Education Responses";
          case "swd":
            return "Sworn Disclosure Responses";
          case "mto":
            return "Mantoux Responses";
          case "pd":
            return "Personal Details";
          case "ed":
            return "Employment Details Responses";
          case "eh":
            return "Employment History Responses";
          case "af":
            return "Desired Position Responses";
          default:
            return "";
        }
      })();

      const pairHTMLStrings: Array<string> = [];

      for (const key of Object.keys(currentSection)) {
        // this gets all of the label & values of each section and puts them in html.

        const pairHTMLString = `<div><p><strong>${currentSection[key].label}</strong></p><p>${currentSection[key].value}</p></div>`;

        pairHTMLStrings.push(pairHTMLString);
      }

      const sectionHTMLString = `<div id='${section}'>
        <h3>${heading}</h3>
        ${(() => {
          if (section === "conf") {
            return "<p>Any information exchanged about <strong>*field one*</strong> either written or verbal, is to be kept confidential by all <strong>*field two*</strong> employees and contracted staff. This applies but is not limited to contract, proposals, regulatory information, forms, paperwork, correspondence, and proceedings of meetings.</p><p>I, <strong>*field three*</strong>, hereby agree to treat and keep all personal medical information on <strong>*field four*</strong> services and or its patients and or clients confidential. Furthermore, I will agree not to release any information to any outside organization or agency without the approval of the patient and or client, or as required by law or third-party payment contract. Any employee that does not comply with this policy will be terminated immediately.</p>";
          }
        })()}
        ${pairHTMLStrings.join("")}
      </div>`;

      sectionHTMLStrings.push(sectionHTMLString);
    }

    const emailHTMLString = `<main>
      <h1>New Application Recieved</h1>
      ${sectionHTMLStrings.join("").replace(/undefined/g, "")}
    </main>`;

    return emailHTMLString;
  };

  const mail = {
    to: "hhealing14@gmail.com",
    from: "hhealing14@gmail.com",
    subject: "New Application Submitted",
    html: getEmailHTMLString(),
  };

  try {
    client.send(mail);
    return redirect("/submitted", 308);
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}
