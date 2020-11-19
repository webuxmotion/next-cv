import BaseLayout from '@/layouts/BaseLayout';

const Cv = () => 
  <BaseLayout>
    <div className="row mt-4">
      <div className="col-md-8 offset-md-2">
        <iframe 
          style={{
            width: '100%',
            height: '800px'
          }}
          src="/cv.pdf"
        >

        </iframe>
      </div>
    </div>
  </BaseLayout>

export default Cv;
