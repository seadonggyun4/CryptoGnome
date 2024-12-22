const VideoBg = () => {
    return (
        <div className="video-bg fixed top-0 right-0 w-full h-full">
            <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                controls={false}
            >
                <source
                    src="/assets/video/bgVideo.mp4"
                    type="video/mp4"
                />
            </video>
        </div>
    );
};

export default VideoBg;
