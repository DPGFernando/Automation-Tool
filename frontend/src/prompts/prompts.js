export const promptTemplate = `
These are \${category} models:
\${models}

These specification which I need :
\${specifications}

Trusted websites list:
\${sites}

search mentioned \${category} models for mentioned specs only in mentioned trusted websites,

If you find results, fill these specs. if not, you must keep those specs value as a blank

After getting result, export those specs sheet for excel sheet. But it must be very readable and well organized. Use specification as columns and \${category} model for rows when you creating the excel sheet. Proceed with all the models and directly give me the excel sheet as output`;