"use client";
import Image from "next/image";
import Link from "next/link";

const PropertyCard = ({project}) => {

  return (
    <div className="item">
              <div className="listing-style1">
                <div className="list-thumb">
                  <Image
                    fill={true}
                    className="w-100 h-100 cover"
                    src={project.image}
                    alt="listings"
                  />
                  {/* <div className="sale-sticker-wrap">
                    {!listing.forRent && (
                      <div className="list-tag fz12">
                        <span className="flaticon-electricity me-2" />
                        FEATURED
                      </div>
                    )}
                  </div> */}

                  {/* <div className="list-price">
                    {listing.price} / <span>mo</span>
                  </div> */}
                </div>
                <div className="list-content">
                  <h6 className="list-title">
                    <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                  </h6>
                  {/* <p className="list-text"><span className="flaticon-maps-1" /> {listing.location}</p> */}
                  <div className="list-meta d-flex flex-column align-items-start">
                    <a href="#">
                    <b>Delivery Date:</b> <span>{new Date(project.delivery_date).getFullYear()}</span>
                    </a>
                    <a href="#">
                    <b>Price from:</b> <span className="">AED {project.start_price}</span>
                    </a>
                    <a href="#">
                    <b>Developer:</b> <span>{project.developer_name}</span>
                    </a>
                  </div>
                  <hr className="mt-2 mb-2" />
                  <div className="list-meta2 d-flex justify-content-between align-items-center">
                  <Link href={`/projects/${project.slug}`} className="ud-btn btn-thm3">
                    Discover
                    <i className="fal fa-arrow-right-long" />
                    </Link>
                    {/* <span className="for-what">For Rent</span> */}
                    <div className="icons d-flex align-items-center propertyCardLink">
                      <Link href="#">
                        <span className="flaticon-whatsapp" />
                      </Link>
                      {/* <a href="#">
                        <span className="flaticon-mobile" />
                      </a> */}
                      <Link href="#" className="far fa-phone"></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
};

export default PropertyCard;
