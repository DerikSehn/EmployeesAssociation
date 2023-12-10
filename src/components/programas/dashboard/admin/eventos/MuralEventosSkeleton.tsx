import { Grid, Skeleton } from '@mui/material';

function MuralEventosSkeleton() {
  return (
    <Grid container item xs={12} lg={3}>
      <Grid container p={2} pb={2} item xs={12}>
        <Skeleton animation={false} variant="rectangular" height={200} width="100%" />
      </Grid>
      <Grid container p={2} pb={4} pt={0} item xs={12}>
        <Skeleton animation={false} variant="rectangular" height={30} width="80%" />
      </Grid>
      <Grid container p={2} pb={1} pt={0} item xs={12}>
        <Skeleton animation={false} variant="rectangular" height={20} width="60%" />
      </Grid>
      <Grid container p={2} pb={1} pt={0} item xs={12}>
        <Skeleton animation={false} variant="rectangular" height={20} width="100%" />
      </Grid>
      <Grid container p={2} pb={5} pt={0} item xs={12}>
        <Skeleton animation={false} variant="rectangular" height={20} width="60%" />
      </Grid>
    </Grid>
  );
}

export default MuralEventosSkeleton;
