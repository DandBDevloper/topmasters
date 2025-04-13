const Subscribe = () => {
  return (
    <div className="mailchimp-widget mb-4 mb-lg-5">
      <h6 className="title text-white">Stay in the loop</h6>
      <p className="cta-text text-white mb20">News and insight straight to your inbox. We dont spam.</p>
      <div className="mailchimp-style1">
        <input type="email" className="form-control" placeholder="Your Email" />
        <button type="submit">Subscribe</button>
      </div>
    </div>
  );
};

export default Subscribe;