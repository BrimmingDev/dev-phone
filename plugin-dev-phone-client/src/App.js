import { useEffect } from "react";
import Konami from "konami";
import { connect } from "react-redux";
import { changeNumberInUse, configureNumberInUse } from "./actions";
import PhoneNumberPicker from "./components/PhoneNumberPicker";
import SendSmsForm from "./components/SendSmsForm";
import Caller from "./components/Caller";
import CallHistory from "./components/CallHistory/CallHistory.jsx"

import { Box, Column, Grid, Stack, Text } from "@twilio-paste/core";

import {
  MediaObject,
  MediaBody,
  MediaFigure,
} from "@twilio-paste/media-object";

import { LogoTwilioIcon } from "@twilio-paste/icons/esm/LogoTwilioIcon";

const formatPnForForm = (number) => `${number} [${number}]`;

const sendSms = (from, to, body) => {
  console.log("Get it sent!");
  console.table({ from, to, body });

  if (from && to && body) {
    fetch("/send-sms", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ from, to, body }),
    });
  } else {
    console.log("Not sending as some data is missing");
  }
};

const setupKonamiCode = () => {
  const ninetiesMode = new Konami(() => {
    window.alert("Lets party like it's 1991!");
  });
  ninetiesMode.pattern = "383840403739373949575749";
};

function App({
  channelData,
  changeNumberInUse,
  configureNumberInUse,
  numberInUse,
}) {
  useEffect(() => {
    setupKonamiCode();
    if (channelData.phoneNumber) {
      changeNumberInUse(channelData.phoneNumber);
    }
  }, [changeNumberInUse, channelData]);

  return (
    <Box>
      <Grid gutter="space30">
        <Column span={12}>
          <Box
            as="header"
            display={["none", "none", "flex"]}
            alignItems="stretch"
            backgroundColor="colorBackgroundBrandHighlight"
            borderBottomColor="colorBorderInverseWeaker"
            borderBottomWidth="borderWidth10"
            borderBottomStyle="solid"
            position="sticky"
            top="0px"
            zIndex="zIndex80"
          >
            <Box
              display="flex"
              alignItems="center"
              paddingRight="space70"
              paddingLeft="space70"
              borderRightColor="colorBorderInverseWeaker"
              borderRightWidth={["borderWidth0", "borderWidth0", "borderWidth10"]}
              width="100%"
            >
              <MediaObject verticalAlign="center">
                <MediaFigure as="h1" spacing="space40">
                  <LogoTwilioIcon
                    decorative={false}
                    title="Description of icon"
                  />
                </MediaFigure>
                <MediaBody as="h2">Dev-Phone</MediaBody>
              </MediaObject>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row"
              paddingTop="space60"
              paddingRight="space70"
              paddingBottom="space60"
              paddingLeft="space70"
              width="100%"
            >
              <Box marginTop="space10">
                <Stack
                  orientation="horizontal"
                  spacing="space60"
                  alignItems="right"
                >
                  <Text>
                    Dev Phone Name:{" "}
                    {channelData ? channelData.devPhoneName : "loading"}
                  </Text>
                  {numberInUse ? (
                    <Text>
                      Calling/Messaging From: {formatPnForForm(numberInUse)}
                    </Text>
                  ) : (
                    ""
                  )}
                </Stack>
              </Box>
            </Box>
          </Box>
        </Column>
      </Grid>
      {numberInUse ? (
          <Grid gutter="space30">
            <Column span={3} offset={1}>
              <Caller numberInUse={numberInUse} />
              <CallHistory />
            </Column>
            <Column span={6} offset={1}>
              <SendSmsForm numberInUse={numberInUse} sendSms={sendSms} />
            </Column>
          </Grid>
      ) : (
       <Grid gutter="space30">
          <Column span={6} offset={3}>
            <PhoneNumberPicker configureNumberInUse={configureNumberInUse} />
          </Column>
       </Grid>
      )}
    </Box>
  );
}

const mapStateToProps = (state) => ({
  channelData: state.channelData,
  numberInUse: state.numberInUse ? state.numberInUse.phoneNumber : "",
});

const mapDispatchToProps = (dispatch) => ({
  changeNumberInUse: (number) => dispatch(changeNumberInUse(number)),
  configureNumberInUse: (number) => dispatch(configureNumberInUse(number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
