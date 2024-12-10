const VideoBg = () => {
    return (
        <div className="video-bg fixed top-0 right-0 w-full h-full">
            <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
            >
                <source
                    src="https://assets.codepen.io/3364143/7btrrd.mp4"
                    type="video/mp4"
                />
            </video>
        </div>
    );
};

export default VideoBg;
