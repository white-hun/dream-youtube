describe("VideoCard", () => {
  const video = {
    id: 1,
    snippet: {
      title: "title",
      channelId: "1",
      channelTitle: "channelTitle",
      publidhedAt: newDate(),
      thumbnails: {
        medium: {
          url: "http://image/",
        },
      },
    },
  };
  it("renders video item", () => {
    render(<VideoCard video={video} />);
  });
});
