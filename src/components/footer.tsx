import Image from 'next/image'
import { Button } from './ui/button'

function Footer() {
  return (
    <footer className="bg-main w-dvw h-fit">
      <div className="px-2 py-4 md:p-6 md:pb-2 lg:p-10">
        {/* Send mail */}
        <div className="flex flex-col md:flex-row border-b-[1px] pb-2 md:pb-4 items-center justify-between gap-2">
          <div className="flex items-center">
            <Image
              src="/plane.svg"
              width={45}
              height={45}
              alt="Plane icon"
              className="w-[45px] h-[45px] mr-5"
            />
            <p className="text-white text-2xl font-bold">Sign Up For Newsletter</p>
          </div>

          <div className="flex w-[95%] md:w-[500px] h-10 items-center bg-white pr-[2px] rounded-md">
            <input type="email" placeholder="Enter your email" className="flex-1 w-[60%] bg-transparent outline-none pl-2 mr-2 text-main font-bold placeholder:text-main" />
            <Button className="bg-main">
              SUBSCRIBE
            </Button>
          </div>
        </div>

        {/* Information contact */}
        <div className="grid md:grid-flow-col grid-rows-2 lg:grid-rows-1 gap-8 mt-6">
          {/* Contact us */}
          <div>
            <h5 className="text-white text-2xl font-bold mb-4 md:mb-10">Contact us</h5>

            <a className="link link-hover text-white">
              <p>No. 1259 Freedom, New York, 1111</p>
              <p>United States</p>
            </a>
            <a className="link link-hover text-white">
              <p>+ 91-987654321</p>
            </a>
            <a className="link link-hover text-white">
              <p>Demo@example.com</p>
            </a>

            <div className="flex gap-2 mt-4">
              <button className="btn btn-circle bg-[#D9D9D9] border-none hover:bg-[#D9D9D9]">
                <Image
                  src="/icon-facebook.svg"
                  width={30}
                  height={30}
                  alt="Plane icon"
                  className='w-[30px] h-[30px]'
                />
              </button>
              <button className="btn btn-circle bg-[#D9D9D9] border-none hover:bg-[#D9D9D9]">
                <Image
                  src="/icon-instagram.svg"
                  width={30}
                  height={30}
                  alt="Plane icon"
                  className='w-[30px] h-[30px]'
                />
              </button>
              <button className="btn btn-circle bg-[#D9D9D9] border-none hover:bg-[#D9D9D9]">
                <Image
                  src="/icon-youtube.svg"
                  width={30}
                  height={30}
                  alt="Plane icon"
                  className='w-[30px] h-[30px]'
                />
              </button>
            </div>
          </div>

          {/* Information */}
          <div>
            <h5 className="text-white text-2xl font-bold mb-4 md:mb-10">Information</h5>

            <a className="link link-hover text-white">
              <p>Privacy policy</p>
            </a>
            <a className="link link-hover text-white">
              <p>Refund policy</p>
            </a>
            <a className="link link-hover text-white">
              <p>Shipping  policy</p>
            </a>
            <a className="link link-hover text-white">
              <p>Terms of  service</p>
            </a>
            <a className="link link-hover text-white">
              <p>Blogs</p>
            </a>
          </div>

          {/* Account */}
          <div>
            <h5 className="text-white text-2xl font-bold mb-4 md:mb-10">Account</h5>

            <a className="link link-hover text-white">
              <p>Search</p>
            </a>
            <a className="link link-hover text-white">
              <p>About us</p>
            </a>
            <a className="link link-hover text-white">
              <p>Faq</p>
            </a>
            <a className="link link-hover text-white">
              <p>Contact</p>
            </a>
            <a className="link link-hover text-white">
              <p>Size chart</p>
            </a>
          </div>

          {/* Our app */}
          <div>
            <h5 className="text-white text-2xl font-bold mb-4 md:mb-10">Account</h5>

            <p className="text-white">Download our App and get extra 15% Discount on</p>
            <p className="text-white">your first Order...!</p>

            <div className="flex gap-2 pt-3">
              <Button variant="secondary" className="h-12" >
                <Image
                  src="/icon-googlePlay-color.svg"
                  width={30}
                  height={30}
                  alt="Plane icon"
                  className='w-[30px] h-[30px]'
                />
                <div className="pl-2">
                  <p>Get it on</p>
                  <p>Google play</p>
                </div>
              </Button>
              <Button variant="secondary" className="h-12" >
                <Image
                  src="/icon-apple.svg"
                  width={30}
                  height={30}
                  alt="Plane icon"
                  className='w-[30px] h-[30px]'
                />
                <div className="pl-2">
                  <p>Get it on</p>
                  <p>Google play</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
