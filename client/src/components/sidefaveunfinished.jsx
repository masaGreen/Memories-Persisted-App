<div className={memoryStyles.cardactions}>
                        <button
                          className={memoryStyles.iconbox}
                          onClick={() => {
                            handleFave(memory._id);
                          }}
                        >
                          {faved ? (
                            <FavoriteIcon className={memoryStyles.favedClass} />
                          ) : (
                            <FavoriteBorderIcon
                              className={memoryStyles.likeIcon}
                            />
                          )}
                        </button>
                      </div>