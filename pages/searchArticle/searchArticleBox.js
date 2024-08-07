import React,{ useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ArticleCard from '../../components/article/articleCard';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';


function SearchArticleBox({keyword, selectedDomain}) {

  const [articleData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/readerArticle/search`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
                  "text":keyword,
            "domain": selectedDomain
          }),
        });
        const jsonData = await response.json();
        console.log("jsonData", jsonData);

        const userId = localStorage.getItem('userId');
        
        if (userId) {
          console.log("readerId", userId);
          const BlockedArticleResponse = await axios.get(`http://localhost:3001/api/blockedArticle/get/${userId}`);
          console.log("Blocked articles:", BlockedArticleResponse.data);
          const filteredArticles = jsonData.filter(article => !BlockedArticleResponse.data.includes(article.articleId));
          console.log("filtered Articles after removing blocked articles", filteredArticles);
          setData(filteredArticles);
          console.log(articleData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [keyword || selectedDomain]);



  return (
          <div style={{marginTop:'20px', width:'100%'}}>
      <Grid sx={{ flexGrow: 1 }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={3}>
            {articleData.map((article) => (
                               <Grid key={article.articleId} article style={{marginTop:'20px'}}>
                <Link href={`/article/${article.articleId}`} passHref>
                                        <ArticleCard {...article}  />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

    </div>

  );
}

export default SearchArticleBox;