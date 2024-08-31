import React from 'react';
import ArticleList from './components/ArticleList';

const Main = () => {
  return (
    <div>
      <h1>Welcome to the News App</h1>
      <ArticleList /> {/* This will render the articles */}
    </div>
  );
};

export default Main;
