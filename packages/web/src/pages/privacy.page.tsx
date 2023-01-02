import { Link } from "@chakra-ui/react";
import { FC } from "react";
import { Heading } from "@yestheory.family/ui";
import { VStack } from "@chakra-ui/react";

const Privacy: FC = () => {
  return (
    <VStack
      mt={[24, null, 64]}
      mx={[8, null, null, 20, null, null, "auto"]}
      align={"flex-start"}
      maxW={"8xl"}
    >
      <Heading textAlign={"left"} frontText={"Privacy Policy"} size={"h2"} />
      <Heading
        textAlign={"left"}
        frontText={"1. An overview of data protection"}
        size={"h3"}
      />
      <Heading
        textAlign={"left"}
        frontText={"General information"}
        size={"h4"}
      />
      <p>
        The following information will provide you with an easy to navigate
        overview of what will happen with your personal data when you visit this
        website. The term “personal data” comprises all data that can be used to
        personally identify you. For detailed information about the subject
        matter of data protection, please consult our Data Protection
        Declaration, which we have included beneath this copy.
      </p>
      <Heading
        textAlign={"left"}
        frontText={"Data recording on this website"}
        size={"h4"}
      />
      <Heading
        textAlign={"left"}
        frontText={
          "Who is the responsible party for the recording of data on this website (i.e., the “controller”)?"
        }
        size={"h5"}
      />
      <p>
        The data on this website is processed by the operator of the website,
        whose contact information is available under section “Information about
        the responsible party (referred to as the “controller” in the GDPR)” in
        this Privacy Policy.
      </p>
      <Heading
        textAlign={"left"}
        frontText={"How do we record your data?"}
        size={"h5"}
      />
      <p>
        We collect your data as a result of your sharing of your data with us.
        This may, for instance be information you enter into our contact form.
      </p>
      <p>
        Other data shall be recorded by our IT systems automatically or after
        you consent to its recording during your website visit. This data
        comprises primarily technical information (e.g., web browser, operating
        system, or time the site was accessed). This information is recorded
        automatically when you access this website.
      </p>
      <Heading
        textAlign={"left"}
        frontText={"What are the purposes we use your data for?"}
        size={"h5"}
      />
      <p>
        A portion of the information is generated to guarantee the error free
        provision of the website. Other data may be used to analyze your user
        patterns.
      </p>
      <Heading
        textAlign={"left"}
        frontText={
          "What rights do you have as far as your information is concerned?"
        }
        size={"h5"}
      />
      <p>
        You have the right to receive information about the source, recipients,
        and purposes of your archived personal data at any time without having
        to pay a fee for such disclosures. You also have the right to demand
        that your data are rectified or eradicated. If you have consented to
        data processing, you have the option to revoke this consent at any time,
        which shall affect all future data processing. Moreover, you have the
        right to demand that the processing of your data be restricted under
        certain circumstances. Furthermore, you have the right to log a
        complaint with the competent supervising agency.
      </p>
      <p>
        Please do not hesitate to contact us at any time if you have questions
        about this or any other data protection related issues.
      </p>
      <Heading textAlign={"left"} frontText={"2. Hosting"} size={"h3"} />
      <Heading textAlign={"left"} frontText={"Hetzner"} size={"h4"} />
      <p>
        We host our website with Hetzner. The provider is the Hetzner Online
        GmbH, Industriestr. 25, 91710 Gunzenhausen, Germany (hereinafter
        referred to as Hetzner).
      </p>
      <p>
        For details, please view the data privacy policy of Hetzner:{" "}
        <Link
          href="https://www.hetzner.com/de/rechtliches/datenschutz"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.hetzner.com/de/rechtliches/datenschutz
        </Link>
        .
      </p>
      <p>
        We use Hetzner on the basis of Art. 6(1)(f) GDPR. We have a legitimate
        interest in the most reliable depiction of our website possible. If your
        respective consent was obtained, processing will occur exclusively based
        on Art. 6(1)(a) GDPR. This consent may be revoked at any time.
      </p>
      <Heading textAlign={"left"} frontText={"Data processing"} size={"h5"} />
      <p>
        We have concluded a data processing agreement (DPA) with the
        above-mentioned provider. This is a contract mandated by data privacy
        laws that guarantees that they process personal data of our website
        visitors only based on our instructions and in compliance with the GDPR.
      </p>
      <Heading
        textAlign={"left"}
        frontText={"3. General information and mandatory information"}
        size={"h3"}
      />
      <Heading textAlign={"left"} frontText={"Data protection"} size={"h4"} />
      <p>
        The operators of this website and its pages take the protection of your
        personal data very seriously. Hence, we handle your personal data as
        confidential information and in compliance with the statutory data
        protection regulations and this Data Protection Declaration.
      </p>
      <p>
        Whenever you use this website, a variety of personal information will be
        collected. Personal data comprises data that can be used to personally
        identify you. This Data Protection Declaration explains which data we
        collect as well as the purposes we use this data for. It also explains
        how, and for which purpose the information is collected.
      </p>
      <p>
        We herewith advise you that the transmission of data via the Internet
        (i.e., through e-mail communications) may be prone to security gaps. It
        is not possible to completely protect data against third-party access.
      </p>
      <Heading
        textAlign={"left"}
        frontText={
          "Information about the responsible party (referred to as the “controller” in the GDPR)"
        }
        size={"h4"}
      />
      <p>The data processing controller on this website is:</p>
      <p>
        Michel von Varendorff
        <br />
        Schönhauser Allee 163
        <br />
        10435 Berlin
      </p>
      <p>E-mail: michelvonv@me.com</p>
      <p>
        The controller is the natural person or legal entity that
        single-handedly or jointly with others makes decisions as to the
        purposes of and resources for the processing of personal data (e.g.,
        names, e-mail addresses, etc.).
      </p>
      <Heading textAlign={"left"} frontText={"Storage duration"} size={"h4"} />
      <p>
        Unless a more specific storage period has been specified in this privacy
        policy, your personal data will remain with us until the purpose for
        which it was collected no longer applies. If you assert a justified
        request for deletion or revoke your consent to data processing, your
        data will be deleted, unless we have other legally permissible reasons
        for storing your personal data (e.g., tax or commercial law retention
        periods); in the latter case, the deletion will take place after these
        reasons cease to apply.
      </p>
      <Heading
        textAlign={"left"}
        frontText={
          "Information on data transfer to the USA and other non-EU countries"
        }
        size={"h4"}
      />
      <p>
        Among other things, we use tools of companies domiciled in the United
        States or other from a data protection perspective non-secure non-EU
        countries. If these tools are active, your personal data may potentially
        be transferred to these non-EU countries and may be processed there. We
        must point out that in these countries, a data protection level that is
        comparable to that in the EU cannot be guaranteed. For instance, U.S.
        enterprises are under a mandate to release personal data to the security
        agencies and you as the data subject do not have any litigation options
        to defend yourself in court. Hence, it cannot be ruled out that U.S.
        agencies (e.g., the Secret Service) may process, analyze, and
        permanently archive your personal data for surveillance purposes. We
        have no control over these processing activities.
      </p>
      <Heading
        textAlign={"left"}
        frontText={"Revocation of your consent to the processing of data"}
        size={"h4"}
      />
      <p>
        A wide range of data processing transactions are possible only subject
        to your express consent. You can also revoke at any time any consent you
        have already given us. This shall be without prejudice to the lawfulness
        of any data collection that occurred prior to your revocation.
      </p>
      <Heading
        textAlign={"left"}
        frontText={
          "Right to object to the collection of data in special cases; right to object to direct advertising (Art. 21 GDPR)"
        }
        size={"h4"}
      />
      <p>
        IN THE EVENT THAT DATA ARE PROCESSED ON THE BASIS OF ART. 6(1)(E) OR (F)
        GDPR, YOU HAVE THE RIGHT TO AT ANY TIME OBJECT TO THE PROCESSING OF YOUR
        PERSONAL DATA BASED ON GROUNDS ARISING FROM YOUR UNIQUE SITUATION. THIS
        ALSO APPLIES TO ANY PROFILING BASED ON THESE PROVISIONS. TO DETERMINE
        THE LEGAL BASIS, ON WHICH ANY PROCESSING OF DATA IS BASED, PLEASE
        CONSULT THIS DATA PROTECTION DECLARATION. IF YOU LOG AN OBJECTION, WE
        WILL NO LONGER PROCESS YOUR AFFECTED PERSONAL DATA, UNLESS WE ARE IN A
        POSITION TO PRESENT COMPELLING PROTECTION WORTHY GROUNDS FOR THE
        PROCESSING OF YOUR DATA, THAT OUTWEIGH YOUR INTERESTS, RIGHTS AND
        FREEDOMS OR IF THE PURPOSE OF THE PROCESSING IS THE CLAIMING, EXERCISING
        OR DEFENCE OF LEGAL ENTITLEMENTS (OBJECTION PURSUANT TO ART. 21(1)
        GDPR).
      </p>
      <p>
        IF YOUR PERSONAL DATA IS BEING PROCESSED IN ORDER TO ENGAGE IN DIRECT
        ADVERTISING, YOU HAVE THE RIGHT TO OBJECT TO THE PROCESSING OF YOUR
        AFFECTED PERSONAL DATA FOR THE PURPOSES OF SUCH ADVERTISING AT ANY TIME.
        THIS ALSO APPLIES TO PROFILING TO THE EXTENT THAT IT IS AFFILIATED WITH
        SUCH DIRECT ADVERTISING. IF YOU OBJECT, YOUR PERSONAL DATA WILL
        SUBSEQUENTLY NO LONGER BE USED FOR DIRECT ADVERTISING PURPOSES
        (OBJECTION PURSUANT TO ART. 21(2) GDPR).
      </p>
      <Heading
        textAlign={"left"}
        frontText={
          "Right to log a complaint with the competent supervisory agency"
        }
        size={"h4"}
      />
      <p>
        In the event of violations of the GDPR, data subjects are entitled to
        log a complaint with a supervisory agency, in particular in the member
        state where they usually maintain their domicile, place of work or at
        the place where the alleged violation occurred. The right to log a
        complaint is in effect regardless of any other administrative or court
        proceedings available as legal recourses.
      </p>
      <Heading
        textAlign={"left"}
        frontText={"Right to data portability"}
        size={"h4"}
      />
      <p>
        You have the right to demand that we hand over any data we automatically
        process on the basis of your consent or in order to fulfil a contract be
        handed over to you or a third party in a commonly used, machine readable
        format. If you should demand the direct transfer of the data to another
        controller, this will be done only if it is technically feasible.
      </p>
      <Heading
        textAlign={"left"}
        frontText={"SSL and/or TLS encryption"}
        size={"h4"}
      />
      <p>
        For security reasons and to protect the transmission of confidential
        content, such as purchase orders or inquiries you submit to us as the
        website operator, this website uses either an SSL or a TLS encryption
        program. You can recognize an encrypted connection by checking whether
        the address line of the browser switches from “http://” to “https://”
        and also by the appearance of the lock icon in the browser line.
      </p>
      <p>
        If the SSL or TLS encryption is activated, data you transmit to us
        cannot be read by third parties.
      </p>
      <Heading
        textAlign={"left"}
        frontText={"Information about, rectification and eradication of data"}
        size={"h4"}
      />
      <p>
        Within the scope of the applicable statutory provisions, you have the
        right to at any time demand information about your archived personal
        data, their source and recipients as well as the purpose of the
        processing of your data. You may also have a right to have your data
        rectified or eradicated. If you have questions about this subject matter
        or any other questions about personal data, please do not hesitate to
        contact us at any time.
      </p>
      <Heading
        textAlign={"left"}
        frontText={"Right to demand processing restrictions"}
        size={"h4"}
      />
      <p>
        You have the right to demand the imposition of restrictions as far as
        the processing of your personal data is concerned. To do so, you may
        contact us at any time. The right to demand restriction of processing
        applies in the following cases:
      </p>
      <ul>
        <li>
          In the event that you should dispute the correctness of your data
          archived by us, we will usually need some time to verify this claim.
          During the time that this investigation is ongoing, you have the right
          to demand that we restrict the processing of your personal data.
        </li>
        <li>
          If the processing of your personal data was/is conducted in an
          unlawful manner, you have the option to demand the restriction of the
          processing of your data in lieu of demanding the eradication of this
          data.
        </li>
        <li>
          If we do not need your personal data any longer and you need it to
          exercise, defend or claim legal entitlements, you have the right to
          demand the restriction of the processing of your personal data instead
          of its eradication.
        </li>
        <li>
          If you have raised an objection pursuant to Art. 21(1) GDPR, your
          rights and our rights will have to be weighed against each other. As
          long as it has not been determined whose interests prevail, you have
          the right to demand a restriction of the processing of your personal
          data.
        </li>
      </ul>
      <p>
        If you have restricted the processing of your personal data, these data
        – with the exception of their archiving – may be processed only subject
        to your consent or to claim, exercise or defend legal entitlements or to
        protect the rights of other natural persons or legal entities or for
        important public interest reasons cited by the European Union or a
        member state of the EU.
      </p>
      <Heading
        textAlign={"left"}
        frontText={"Rejection of unsolicited e-mails"}
        size={"h4"}
      />
      <p>
        We herewith object to the use of contact information published in
        conjunction with the mandatory information to be provided in our Site
        Notice to send us promotional and information material that we have not
        expressly requested. The operators of this website and its pages reserve
        the express right to take legal action in the event of the unsolicited
        sending of promotional information, for instance via SPAM messages.
      </p>
      <Heading
        textAlign={"left"}
        frontText={"4. Recording of data on this website"}
        size={"h3"}
      />
      <Heading textAlign={"left"} frontText={"Cookies"} size={"h4"} />
      <p>
        Our websites and pages use what the industry refers to as “cookies.”
        Cookies are small text files that do not cause any damage to your
        device. They are either stored temporarily for the duration of a session
        (session cookies) or they are permanently archived on your device
        (permanent cookies). Session cookies are automatically deleted once you
        terminate your visit. Permanent cookies remain archived on your device
        until you actively delete them, or they are automatically eradicated by
        your web browser.
      </p>
      <p>
        In some cases, it is possible that third-party cookies are stored on
        your device once you enter our site (third-party cookies). These cookies
        enable you or us to take advantage of certain services offered by the
        third party (e.g., cookies for the processing of payment services).
      </p>
      <p>
        Cookies have a variety of functions. Many cookies are technically
        essential since certain website functions would not work in the absence
        of the cookies (e.g., the shopping cart function or the display of
        videos). The purpose of other cookies may be the analysis of user
        patterns or the display of promotional messages.
      </p>
      <p>
        Cookies, which are required for the performance of electronic
        communication transactions (required cookies) or for the provision of
        certain functions you want to use (functional cookies, e.g., for the
        shopping cart function) or those that are necessary for the optimization
        of the website (e.g., cookies that provide measurable insights into the
        web audience), shall be stored on the basis of Art. 6(1)(f) GDPR, unless
        a different legal basis is cited. The operator of the website has a
        legitimate interest in the storage of cookies to ensure the technically
        error free and optimized provision of the operator’s services. If your
        consent to the storage of the cookies has been requested, the respective
        cookies are stored exclusively on the basis of the consent obtained
        (Art. 6(1)(a) GDPR); this consent may be revoked at any time.
      </p>
      <p>
        You have the option to set up your browser in such a manner that you
        will be notified any time cookies are placed and to permit the
        acceptance of cookies only in specific cases. You may also exclude the
        acceptance of cookies in certain cases or in general or activate the
        delete function for the automatic eradication of cookies when the
        browser closes. If cookies are deactivated, the functions of this
        website may be limited.
      </p>
      <p>
        In the event that third-party cookies are used or if cookies are used
        for analytical purposes, we will separately notify you in conjunction
        with this Data Protection Policy and, if applicable, ask for your
        consent.
      </p>
      <Heading textAlign={"left"} frontText={"Server log files"} size={"h4"} />
      <p>
        The provider of this website and its pages automatically collects and
        stores information in so-called server log files, which your browser
        communicates to us automatically. The information comprises:
      </p>
      <ul>
        <li>The type and version of browser used</li>
        <li>The used operating system</li> <li>Referrer URL</li>
        <li>The hostname of the accessing computer</li>
        <li>The time of the server inquiry</li> <li>The IP address</li>
      </ul>
      <p>This data is not merged with other data sources.</p>
      <p>
        This data is recorded on the basis of Art. 6(1)(f) GDPR. The operator of
        the website has a legitimate interest in the technically error free
        depiction and the optimization of the operator’s website. In order to
        achieve this, server log files must be recorded.
      </p>
      <Heading
        textAlign={"left"}
        frontText={"Request by e-mail, telephone, or fax"}
        size={"h4"}
      />
      <p>
        If you contact us by e-mail, telephone or fax, your request, including
        all resulting personal data (name, request) will be stored and processed
        by us for the purpose of processing your request. We do not pass these
        data on without your consent.
      </p>
      <p>
        These data are processed on the basis of Art. 6(1)(b) GDPR if your
        inquiry is related to the fulfillment of a contract or is required for
        the performance of pre-contractual measures. In all other cases, the
        data are processed on the basis of our legitimate interest in the
        effective handling of inquiries submitted to us (Art. 6(1)(f) GDPR) or
        on the basis of your consent (Art. 6(1)(a) GDPR) if it has been
        obtained.
      </p>
      <p>
        The data sent by you to us via contact requests remain with us until you
        request us to delete, revoke your consent to the storage or the purpose
        for the data storage lapses (e.g. after completion of your request).
        Mandatory statutory provisions - in particular statutory retention
        periods - remain unaffected.
      </p>
      <Heading
        textAlign={"left"}
        frontText={"5. Plug-ins and Tools"}
        size={"h3"}
      />
      <Heading
        textAlign={"left"}
        frontText={"YouTube with expanded data protection integration"}
        size={"h4"}
      />
      <p>
        Our website embeds videos of the website YouTube. The website operator
        is Google Ireland Limited (“Google”), Gordon House, Barrow Street,
        Dublin 4, Ireland.
      </p>
      <p>
        We use YouTube in the expanded data protection mode. According to
        YouTube, this mode ensures that YouTube does not store any information
        about visitors to this website before they watch the video.
        Nevertheless, this does not necessarily mean that the sharing of data
        with YouTube partners can be ruled out as a result of the expanded data
        protection mode. For instance, regardless of whether you are watching a
        video, YouTube will always establish a connection with the Google
        DoubleClick network.
      </p>
      <p>
        As soon as you start to play a YouTube video on this website, a
        connection to YouTube’s servers will be established. As a result, the
        YouTube server will be notified, which of our pages you have visited. If
        you are logged into your YouTube account while you visit our site, you
        enable YouTube to directly allocate your browsing patterns to your
        personal profile. You have the option to prevent this by logging out of
        your YouTube account.
      </p>
      <p>
        Furthermore, after you have started to play a video, YouTube will be
        able to place various cookies on your device or comparable technologies
        for recognition (e.g. device fingerprinting). In this way YouTube will
        be able to obtain information about this website’s visitors. Among other
        things, this information will be used to generate video statistics with
        the aim of improving the user friendliness of the site and to prevent
        attempts to commit fraud.
      </p>
      <p>
        Under certain circumstances, additional data processing transactions may
        be triggered after you have started to play a YouTube video, which are
        beyond our control.
      </p>
      <p>
        The use of YouTube is based on our interest in presenting our online
        content in an appealing manner. Pursuant to Art. 6(1)(f) GDPR, this is a
        legitimate interest. If a corresponding agreement has been requested,
        the processing takes place exclusively on the basis of Art. 6(1)(a)
        GDPR; the agreement can be revoked at any time.
      </p>
      <p>
        For more information on how YouTube handles user data, please consult
        the YouTube Data Privacy Policy under:{" "}
        <Link
          href="https://policies.google.com/privacy?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://policies.google.com/privacy?hl=en
        </Link>
        .
      </p>
      <Heading
        textAlign={"left"}
        frontText={"Google Web Fonts (local embedding)"}
        size={"h4"}
      />
      <p>
        This website uses so-called Web Fonts provided by Google to ensure the
        uniform use of fonts on this site. These Google fonts are locally
        installed so that a connection to Google’s servers will not be
        established in conjunction with this application.
      </p>
      <p>
        For more information on Google Web Fonts, please follow this link:{" "}
        <Link
          href="https://developers.google.com/fonts/faq"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://developers.google.com/fonts/faq
        </Link>
        and consult Google’s Data Privacy Declaration under:{" "}
        <Link
          href="https://policies.google.com/privacy?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://policies.google.com/privacy?hl=en
        </Link>
        .
      </p>
      <Heading
        textAlign={"left"}
        frontText={"6. eCommerce and payment service providers"}
        size={"h3"}
      />
      <Heading
        textAlign={"left"}
        frontText={"Processing of data (customer and contract data)"}
        size={"h4"}
      />
      <p>
        We collect, process, and use personal data only to the extent necessary
        for the establishment, content organization or change of the legal
        relationship (data inventory). These actions are taken on the basis of
        Art. 6(1)(b) GDPR, which permits the processing of data for the
        fulfilment of a contract or pre-contractual actions. We collect,
        process, and use personal data concerning the use of this website (usage
        data) only to the extent that this is necessary to make it possible for
        users to utilize the services and to bill for them.
      </p>
      <p>
        The collected customer data shall be eradicated upon completion of the
        order or the termination of the business relationship. This shall be
        without prejudice to any statutory retention mandates.
      </p>
    </VStack>
  );
};

export default Privacy;
