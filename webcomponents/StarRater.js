class StarRater extends HTMLElement {
  constructor() {
    super()

    this.build();
  }

  build() {
    const shadow = this.attachShadow({ mode: 'open' });
    const rater = this.createRater();
    
    this.stars = this.createStars();
    this.stars.forEach((star) => rater.appendChild(star));

    this.resetRating();

    // Shadow appendChilds
    shadow.appendChild(this.style());
    shadow.appendChild(rater);
  }

  createRater() {
    const rater = document.createElement('div');
    rater.addEventListener('mouseout', this.resetRating);
    return rater;
  }

  createStars() {
    const createStar = (_, id) => {
      const star = document.createElement('span');
      star.classList.add('star');
      star.innerHTML = '&#9733;'
      star.dataset.value = Number(id) + 1;
      star.addEventListener('click', this.setRating);
      star.addEventListener('mouseover', this.ratingHover);

      return star;
    }

    return Array.from({ length: 5 }, createStar)
  }

  highlightRating() {
    this.stars.forEach((star) => {
      star.style.color = (
        this.currentRatingValue >= star.dataset.value
          ? '#f0fa4f'
          : '#eee'
      )

      star.style.transition = 'all .25s ease';
    })
  }

  setRating = (event) => {
    this.dataset.rating = event.target.dataset.value;
  }

  ratingHover = (event) => {
    this.currentRatingValue = event.target.dataset.value;
    this.highlightRating();
  }

  resetRating = () => {
    this.currentRatingValue = this.dataset.rating;
    this.highlightRating();
  }

  style() {
    const style = document.createElement('style');
    style.textContent = `
      .star {
        cursor: pointer;
        font-size: 5rem;
      }
    `;

    return style;
  }
}

customElements.define('star-rater', StarRater)
