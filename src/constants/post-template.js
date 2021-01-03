const postTemplate = `{% extends "base.njk" %}

{% block metaTitle %}<% POST_TITLE %> | Liam Snowdon's Blog{% endblock %}
{% block metaDescription %}<% POST_INTRO %>{% endblock %}

{% block metaOgTitle %}<% POST_TITLE %> | Liam Snowdon's Blog{% endblock %}
{% block metaOgDescription %}<% POST_INTRO %>{% endblock %}
{% block metaOgType %}article{% endblock %}

{% block metaArticle %}
  <meta property="article:published_time" content="<% POST_DATE_POSTED %>">
  <meta property="article:author" content="<% POST_AUTHOR %>">
  <% ARTICLE_TAGS %>
{% endblock %}

{% block metaOgImage %}<% POST_OG_IMAGE_URL %>{% endblock %}
{% block metaOgUrl %}/posts/<% POST_FILE %>{% endblock %}

{% import "macros/post-page.njk" as postPage %}

{% set post = data.posts | getById(<% POST_ID %>) %}

{% block content %}
  {{ postPage.header(post) }}
  
  <main>
    {% include "partials/sticky-navigation.njk" %}

    {{ postPage.content(post) }}
  </main>
{% endblock %}

{% block additionalJS %}
  <script src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed/public/caniuse-embed.min.js"></script>
{% endblock %}
`;

export default postTemplate;