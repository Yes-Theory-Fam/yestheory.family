import { FunctionalComponent } from "preact";
import { Heading } from "@yestheory.family/ui";
import { VStack } from "@chakra-ui/react";

const Imprint: FunctionalComponent = () => {
  return (
    <VStack align="flex-start" mt={24} mx={[8, null, null, 20]}>
      <Heading frontText={"Site Notice"} size={"h2"} textAlign={"start"} />

      <Heading
        frontText={"Information pursuant to Sect. 5 German Telemedia Act (TMG)"}
        size={"h3"}
        textAlign={"start"}
      />
      <p>
        Michel von Varendorff
        <br />
        Straße, Nr.
        <br />
        Postleitzahl Ort
      </p>

      <Heading frontText={"Contact"} size={"h3"} textAlign={"start"} />
      <p>
        Phone: Telefon
        <br />
        Telefax: Telefax
        <br />
        E-mail: E-Mail-Adresse
      </p>

      <Heading frontText={"VAT ID"} size={"h3"} textAlign={"start"} />
      <p>
        Sales tax identification number according to Sect. 27 a of the Sales Tax
        Law:
        <br />
        Umsatzsteuer-ID
      </p>

      <Heading
        frontText={"Person responsible for editorial"}
        size={"h3"}
        textAlign={"start"}
      />
      <p>
        Michel von Varendorff
        <br />
        Straße, Nr.
        <br />
        Postleitzahl Ort
      </p>

      <Heading
        frontText={"EU dispute resolution"}
        size={"h3"}
        textAlign={"start"}
      />
      <p>
        The European Commission provides a platform for online dispute
        resolution (ODR):{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        .<br /> Our e-mail address can be found above in the site notice.
      </p>

      <Heading
        frontText={
          "Dispute resolution proceedings in front of a consumer arbitration board"
        }
        size={"h3"}
        textAlign={"start"}
      />
      <p>
        We are not willing or obliged to participate in dispute resolution
        proceedings in front of a consumer arbitration board.
      </p>
    </VStack>
  );
};

export default Imprint;
