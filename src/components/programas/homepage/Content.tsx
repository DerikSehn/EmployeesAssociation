import { Button, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isMobile, isTablet } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import logoBonecos from '@/Assets/PESSOAS AFU.png';
import CardButtonCadastro from '../../cards/CardContained';
import Beneficios from './Beneficios';
import Parcerias from './Parcerias';
import Servicos from './Servicos';

export const useStyles = makeStyles((theme: Theme) => ({
  homeContentRoot: {},
  sectionWrapper: {
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.dark,
    minHeight: '600px',
  },
  carouselWrapper: {
    padding: isMobile || isTablet ? '0px 0px 15rem' : '5rem 5rem 15rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    minHeight: '600px',
  },
  carousel: {
    maxWidth: 600,
    margin: '0 auto',
    alignItems: 'center',
    width: 'calc(100% - .5rem)',
    paddingLeft: '2rem',
  },
  mainTitle: {
    paddingTop: '1rem',
    color: theme.palette.background.paper,
    letterSpacing: '.5px !important',
    textShadow: `0px 0px .1rem ${theme.palette.background.paper}`,
  },
  gridActionsWrapper: {
    flexGrow: 1,
    padding: isMobile || isTablet ? '' : '0 5rem',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.dark,
  },
  gridActions: {
    margin: '0 auto',
    maxWidth: 1360,
    width: '100%',
  },
  mainSubtitle: {
    padding: '5rem 1rem 1.5rem 0',
    color: theme.palette.background.paper,
  },
  gridItemEvento: {
    flexGrow: 1,
    transform: 'translateY(-45%)',
  },
  actionButton: {},
  imgContainer: {},
  imgLogoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '500px',
    width: '50%',
  },
  imgLogo: {
    width: 'calc(100% - .5rem)',
    maxWidth: '100%',
    paddingRight: '1rem',
  },
}));

function Home() {
  const classes = useStyles(isMobile);
  const navigate = useNavigate();

  function handleClick(page: string | undefined) {
    navigate(`/${page ?? ''}`);
  }

  return (
    <Grid container className={classes.homeContentRoot}>
      <Grid className={classes.carouselWrapper} pb={15} pt={isMobile || isTablet ? 3 : 0} container item xs={12}>
        <Grid item className={classes.imgLogoContainer}>
          <img src={logoBonecos} alt="logo" className={classes.imgLogo} />
        </Grid>
        <Grid item className={classes.carousel}>
          <Typography variant={isMobile || isTablet ? 'h5' : 'h4'} className={classes.mainTitle}>
            Associação dos Funcionários da
          </Typography>
          <Typography variant={isMobile || isTablet ? 'h5' : 'h2'} fontWeight={1000} className={classes.mainTitle}>
            Unimed Vale do Caí
          </Typography>

          <Typography variant="h6" className={classes.mainSubtitle}>
            Junte-se à Associação dos Funcionários da Unimed e descubra um mundo de benefícios especiais para você!
          </Typography>
          <Button href="#scroll-informacoes" variant="contained" color="primary" className={classes.actionButton}>
            Informações
          </Button>
          <Button href="#scroll-participe" variant="contained" color="primary" sx={{ ml: 1 }}>
            Participe
          </Button>
        </Grid>
      </Grid>
      {/* <Grid container item xs={12} className={classes.gridActionsWrapper}>
        <Grid container item gap={2} justifyContent="space-between" className={classes.gridActions}>
          <Grid item className={classes.gridItemEvento}>
            <CardEvento
              readOnly
              imagem={imgServicos}
              title="Nossos Serviços"
              description="Explore os diversos serviços oferecidos pela Associação de Funcionários da Unimed para tornar a sua vida mais fácil. Desde planos de saúde até serviços de bem-estar, estamos aqui para atender às suas necessidades."
              buttonText="Explorar"
              variant="default"
              onClick={() => handleClick('servicos')}
            />
          </Grid>
          <Grid item className={classes.gridItemEvento}>
            <CardEvento
              readOnly
              imagem={imgBeneficios}
              title="Benefícios"
              description="Descubra os incríveis benefícios que você pode desfrutar como membro da Associação dos Funcionários da Unimed. Desde descontos exclusivos em lojas e restaurantes até oportunidades de desenvolvimento profissional, temos algo especial para todos os nossos membros."
              buttonText="Explorar"
              variant="default"
              onClick={() => handleClick('beneficios')}
            />
          </Grid>
          <Grid item className={classes.gridItemEvento}>
            <CardEvento
              readOnly
              imagem={imgEmpresas}
              title="Empresas Parceiras"
              description="Conheça as empresas parceiras da Associação de Funcionários da Unimed que oferecem vantagens exclusivas para os membros. Economize em produtos e serviços enquanto apoia nossos parceiros comerciais locais."
              buttonText="Explorar"
              variant="default"
              onClick={() => handleClick('parcerias')}
            />
          </Grid>
          <Grid item className={classes.gridItemEvento}>
            <CardEvento
              readOnly
              imagem={imgUniao}
              title="Faça Parte"
              description="Seja parte da nossa comunidade na Associação de Funcionários da Unimed. Ao se juntar a nós, você terá acesso a uma rede de colegas, eventos emocionantes e oportunidades para contribuir para o nosso ambiente de trabalho e comunidade."
              buttonText="Explorar"
              variant="default"
              onClick={() => handleClick('facaParte')}
            />
          </Grid>
        </Grid>
      </Grid> */}
      <Grid container item xs={12} className={classes.gridActionsWrapper} p={2} maxHeight={1000}>
        <div id="scroll-participe" />
        <Grid container item className={classes.gridActions} gap={1} style={{ aspectRatio: 2 }}>
          <CardButtonCadastro
            title="Para Associados"
            subtitle="Cadastre-se ou entre como um Associado dos Funcionários da Unimed Vale Do Caí para desfrutar dos recursos oferecidos pela plataforma."
            onClick={() => handleClick('afu')}
          >
            <img
              alt="img"
              style={{ minHeight: isMobile || isTablet ? '400px' : undefined }}
              src="https://www.unimed.coop.br/site/documents/4731113/11217259/Hospital-web.jpg/f67e7eb3-472e-fcc8-77a7-9804c3f8de80?t=1645701311292"
            />
          </CardButtonCadastro>
          <CardButtonCadastro
            title="Para Empresas"
            subtitle="Cadastre-se como um conveniado da Associado dos Funcionários da Unimed Vale Do Caí e impulsione seu negócio."
            onClick={() => handleClick('conveniado')}
          >
            <img
              alt="img"
              style={{ minHeight: isMobile || isTablet ? '400px' : undefined }}
              src="https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_1280.jpg"
            />
          </CardButtonCadastro>
        </Grid>
      </Grid>
      <Servicos />
      <Grid id="scroll-informacoes" />
      <Beneficios defaultList={undefined} title="Benefícios" />
      <Parcerias />
      {/*  <Grid container item xs={12} className={classes.sectionWrapper}>
        <Servicos />
      </Grid>
      <Grid container item xs={12} className={classes.sectionWrapper}>
        <Parcerias />
      </Grid> */}
    </Grid>
  );
}

export default Home;
