import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

function Footer() {
  return (
    <div>
      <Box
        component="footer"
        sx={() => ({
          minHeight: "100px",
          padding: "35px 0",
          fontSize: "13px",
        })}
      >
        <Container maxWidth="lg">
          <Stack direction="column" gap={3}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography variant="span">Audio and Subtitles</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="span">Audio Description</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="span">Help center</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="span">Gift Cards</Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography variant="span">Media Center</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="span">Investor Relations</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="span">Jobs</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="span">Terms of Use</Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography variant="span">Security</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="span">Legal Provisions</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="span">Cookie Preferences</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="span">Corporate Information</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="span">Contact us</Typography>
              </Grid>
            </Grid>
            <Button
              sx={{
                border: "1px solid grey",
                lineHeight: "16px",
                padding: "10px",
                borderRadius: 0,
                textTransform: "capitalize",
                color: "inherit",
                width: "fit-content",
              }}
            >
              Service Code
            </Button>
            <Typography component="small" variant="caption">
              © 2022 Movies, All Right Reserved
            </Typography>
          </Stack>
        </Container>
      </Box>
    </div>
  );
}

export default Footer;
