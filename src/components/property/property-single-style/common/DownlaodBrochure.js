import Image from "next/image";
import Modal from "./Modal";

const DownloadBrochure = ({ image, title, developer }) => {
    // Make sure there's at least one image in the array
    const imageUrl = image ? image : 'https://d3h330vgpwpjr8.cloudfront.net/x/2400x/DAMAC_Islands_Dubai_Luxury_Villas_and_Townhouses_29bd7b568b.webp';
  
    return (
        <>
        <div className="container floorplanSection">
          <div className="row">

          <div className="col-12 col-md-6 d-flex align-items-center">
              <div>
                  <h4>Download Floorplan</h4>
                  <p>Everything you need to know about this project</p>
                  <button className="ud-btn btn-thm"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#advanceSeachModalBrochure">Download Floorplans</button>
              </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="brochureImage">

              <Image src='https://enquiries.estate/communities/dubai-hills-estate/images/brochure.webp' alt="An example responsive image"
                width={400}
                height={300}
                priority />
            </div>
          </div>
          </div>
        </div>

        <Modal id="advanceSeachModalBrochure" title="Download Floorplans"/>
        </>
    )
}
export default DownloadBrochure;