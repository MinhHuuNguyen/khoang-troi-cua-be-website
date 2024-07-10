/* eslint-disable @next/next/no-img-element */

import { CardNews, HighlightNews } from "@/components/features/news";
import { ListSmallNews } from "@/components/features/news/ListSmallNews";
import { SEO } from "@/configs/seo.config";
import { getHighlightNews, getMediumNews, getPrivateNews } from "@/utils/common";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { DefaultSeo } from "next-seo";
import logoImg from "../../../public/ktcb-logo-512.png";
import styles from "@/styles/News.module.css";
import { useRouter } from "next/router";
import { CoverImageBrand } from "@/components/features/home/components/CoverImageBrand";

const PrivateNews = () => {
    const route = useRouter();
    const { team } = route.query;
    const teamParam = team as string | undefined;
  
    const highlightNews = getHighlightNews(teamParam);
    const mediumNews = getMediumNews(teamParam);
    const privateNews = getPrivateNews(teamParam);
  
    return (
      <>
        <DefaultSeo {...SEO} title={"Tài liệu nội bộ"} />
  
        <Stack>
          <Box className="relative">
            <CoverImageBrand team={teamParam} />
          </Box>
  
          {(privateNews) ? (
            <Container maxWidth="xl">
              <Stack
                sx={{
                  paddingTop: "40px",
                  paddingBottom: "40px",
                  gap: "30px",
                }}
              >
                {privateNews && privateNews.length > 0 ? (
                  <Grid container spacing={2}>
                    {privateNews.map((news, index) => (
                      <Grid item xs={12} md={6} lg={4} key={index}>
                        <CardNews
                          banner_url={news?.banner_url}
                          slug={news?.slug}
                          title={news?.title}
                          description={news?.description}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : null}
  
              </Stack>
            </Container>
          ) : null}
        </Stack>
      </>
    );
  };

export default PrivateNews;
