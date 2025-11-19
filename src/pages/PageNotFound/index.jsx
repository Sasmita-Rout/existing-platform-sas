import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <h1 className="text-center">404</h1>

              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>

                <p>The page you are looking for not available!</p>

                <Link to="/Home" className="link_404">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
