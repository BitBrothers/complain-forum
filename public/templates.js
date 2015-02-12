angular.module("complaintForum").run(["$templateCache", function($templateCache) {$templateCache.put("views/home.html","<header class=\"intro-header\" style=\"background-image: url(\'images/home-bg.jpg\')\">\r\n        <div class=\"container\">\r\n            <div class=\"row\">\r\n                <div class=\"col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1\">\r\n                    <div class=\"site-heading\">\r\n                        <h1>Ready to change Goa?</h1>\r\n                        <hr class=\"small\">\r\n                        <span class=\"subheading\">Connect with you local governs via forchange.io and build a better city</span>\r\n                        <div class=\"landing-btn\">\r\n                            <button type=\"button\" class=\"btn btn-primary btn-md\">Explore Complaint</button>\r\n                            <button type=\"button\" class=\"btn btn-primary btn-md\">Post Complaint</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </header>\r\n    <section id=\"features\" class=\"content-section container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-12 text-center\">\r\n                <h2 class=\"section-heading\">File Complaint for</h2>\r\n                <h3 class=\"section-subheading text-muted\">Lorem ipsum dolor sit amet consectetur.</h3>\r\n            </div>\r\n        </div>\r\n        <div class=\"row text-center\">\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa-stack fa-4x\">\r\n                    <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\r\n                    <i class=\"fa fa-building-o fa-stack-1x fa-inverse\"></i>\r\n                </span>\r\n                <h4 class=\"service-heading\">Form and Process</h4>\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa-stack fa-4x\">\r\n                    <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\r\n                    <i class=\"fa fa-shopping-cart fa-stack-1x fa-inverse\"></i>\r\n                </span>\r\n                <h4 class=\"service-heading\">Infrastruture</h4>\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa-stack fa-4x\">\r\n                    <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\r\n                    <i class=\"fa fa-university fa-stack-1x fa-inverse\"></i>\r\n                </span>\r\n                <h4 class=\"service-heading\">Public Administration</h4>\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa-stack fa-4x\">\r\n                    <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\r\n                    <i class=\"fa fa-wechat fa-stack-1x fa-inverse\"></i>\r\n                </span>\r\n                <h4 class=\"service-heading\">Local Security</h4>\r\n            </div>\r\n        </div>\r\n        <div class=\"row text-center\">\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa-stack fa-4x\">\r\n                    <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\r\n                    <i class=\"fa fa-tachometer fa-stack-1x fa-inverse\"></i>\r\n                </span>\r\n                <h4 class=\"service-heading\">Public Relation</h4>\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa-stack fa-4x\">\r\n                    <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\r\n                    <i class=\"fa fa-truck fa-stack-1x fa-inverse\"></i>\r\n                </span>\r\n                <h4 class=\"service-heading\">Commerce</h4>\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa-stack fa-4x\">\r\n                    <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\r\n                    <i class=\"fa fa-laptop fa-stack-1x fa-inverse\"></i>\r\n                </span>\r\n                <h4 class=\"service-heading\">Tourist Department</h4>\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa-stack fa-4x\">\r\n                    <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\r\n                    <i class=\"fa fa-send-o fa-stack-1x fa-inverse\"></i>\r\n                </span>\r\n                <h4 class=\"service-heading\">Road and Safetly</h4>\r\n            </div>\r\n        </div>\r\n        <div class=\"row text-center\">\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa-stack fa-4x\">\r\n                    <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\r\n                    <i class=\"fa fa-stack-exchange fa-stack-1x fa-inverse\"></i>\r\n                </span>\r\n                <h4 class=\"service-heading\">Public Health</h4>\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa-stack fa-4x\">\r\n                    <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\r\n                    <i class=\"fa fa-unsorted fa-stack-1x fa-inverse\"></i>\r\n                </span>\r\n                <h4 class=\"service-heading\">RTO</h4>\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa-stack fa-4x\">\r\n                    <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\r\n                    <i class=\"fa fa-slideshare fa-stack-1x fa-inverse\"></i>\r\n                </span>\r\n                <h4 class=\"service-heading\">Electricity Board</h4>\r\n            </div>\r\n            <div class=\"col-md-3\">\r\n                <span class=\"fa-stack fa-4x\">\r\n                    <i class=\"fa fa-circle fa-stack-2x text-primary\"></i>\r\n                    <i class=\"fa fa-search-minus fa-stack-1x fa-inverse\"></i>\r\n                </span>\r\n                <h4 class=\"service-heading\">Water Department</h4>\r\n            </div>\r\n        </div>\r\n    </section>\r\n    <section id=\"complaints\" class=\"content-section container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-12 text-center\">\r\n                <h2 class=\"section-heading\">Complaints</h2>\r\n                <h3 class=\"section-subheading text-muted\">Lorem ipsum dolor sit amet consectetur.</h3>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-10 col-sm-offset-1\">\r\n                 <div class=\"col-md-4 col-sm-6\">\r\n                     <div class=\"complaint-container\">\r\n                        <div class=\"complaint\">\r\n                            <div class=\"front\">\r\n                                <div class=\"cover\">\r\n                                </div>\r\n                                <div class=\"user\">\r\n                                    <img class=\"img-circle\" src=\"images/agro-icon.jpg\">\r\n                                </div>\r\n                                <div class=\"content\">\r\n                                    <h3 class=\"title\">I believe every human has a finite number of heartbeats. I don\'t intend..</h3>\r\n                                </div>\r\n                                <div class=\"footer\">\r\n                                    <i class=\"fa fa-map-marker\"> Panjim, Goa</i>\r\n                                </div>\r\n                            </div> <!-- end front panel -->\r\n                            <div class=\"back\">\r\n                                <div class=\"header\">\r\n                                    <h5 class=\"motto\">Pending</h5>\r\n                                </div> \r\n                                <div class=\"content\">\r\n                                    <p class=\"text-muted\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>\r\n                                    <button class=\"btn btn-sm btn-sucess\">Read more</button>\r\n                                </div>\r\n                                <div class=\"footer\">\r\n                                    <div class=\"social-links text-center\">\r\n                                        <a href=\"#\" class=\"facebook\"><i class=\"fa fa-facebook fa-fw\"></i></a>\r\n                                        <a href=\"#\" class=\"google\"><i class=\"fa fa-google-plus fa-fw\"></i></a>\r\n                                        <a href=\"#\" class=\"twitter\"><i class=\"fa fa-twitter fa-fw\"></i></a>\r\n                                    </div>\r\n                                </div>\r\n                            </div> <!-- end back panel -->\r\n                        </div> <!-- end complaint -->\r\n                    </div> <!-- end complaint-container -->\r\n                </div> <!-- end col sm 3 -->\r\n<!--         <div class=\"col-sm-1\"></div> -->\r\n                <div class=\"col-md-4 col-sm-6\">\r\n                     <div class=\"complaint-container\">\r\n                        <div class=\"complaint\">\r\n                            <div class=\"front\">\r\n                                <div class=\"cover\">\r\n                                </div>\r\n                                <div class=\"user\">\r\n                                    <img class=\"img-circle\" src=\"images/naturalresource-icon.jpg\">\r\n                                </div>\r\n                                <div class=\"content\">\r\n                                    <h3 class=\"title\">Science has not yet mastered prophecy</h3>\r\n                                </div>\r\n                                <div class=\"footer\">\r\n                                        <i class=\"fa fa-map-marker\"> Panjim, Goa</i>\r\n                                </div>\r\n                            </div> <!-- end front panel -->\r\n                            <div class=\"back\">\r\n                                <div class=\"header\">\r\n                                    <h5 class=\"motto\">Work in progress</h5>\r\n                                </div> \r\n                                <div class=\"content\">\r\n                                    <div class=\"main\">\r\n                                        <p class=\"text-muted\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>\r\n                                        <div class=\"read-more-btn\">\r\n                                            <a href=\"#\">Read more</a>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer\">\r\n                                    <div class=\"social-links text-center\">\r\n                                        <a href=\"#\" class=\"facebook\"><i class=\"fa fa-facebook fa-fw\"></i></a>\r\n                                        <a href=\"#\" class=\"google\"><i class=\"fa fa-google-plus fa-fw\"></i></a>\r\n                                        <a href=\"#\" class=\"twitter\"><i class=\"fa fa-twitter fa-fw\"></i></a>\r\n                                    </div>\r\n                                </div>\r\n                            </div> <!-- end back panel -->\r\n                        </div> <!-- end complaint -->\r\n                    </div> <!-- end complaint-container -->\r\n                </div> <!-- end col sm 3 -->\r\n<!--         <div class=\"col-sm-1\"></div> -->\r\n                <div class=\"col-md-4 col-sm-6\">\r\n                    <div class=\"complaint-container\">\r\n                        <div class=\"complaint\">\r\n                            <div class=\"front\">\r\n                                <div class=\"cover\">\r\n                                </div>\r\n                                <div class=\"user\">\r\n                                    <img class=\"img-circle\" src=\"images/administration-icon.jpg\">\r\n                                </div>\r\n                                <div class=\"content\">\r\n                                    <h3 class=\"title\">Man must explore, and this is exploration at its greatest</h3>\r\n                                    \r\n                                </div>\r\n                                <div class=\"footer\">\r\n                                        <i class=\"fa fa-map-marker\"> Panjim, Goa</i>\r\n                                </div>\r\n                            </div> <!-- end front panel -->\r\n                            <div class=\"back\">\r\n                                <div class=\"header\">\r\n                                    <h5 class=\"motto\">Work in progress</h5>\r\n                                </div> \r\n                                <div class=\"content\">\r\n                                    <div class=\"main\">\r\n                                        <p class=\"text-muted\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>\r\n                                        <div class=\"read-more-btn\">\r\n                                            <a href=\"#\">Read more</a>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"footer\">\r\n                                    <div class=\"social-links text-center\">\r\n                                        <a href=\"#\" class=\"facebook\"><i class=\"fa fa-facebook fa-fw\"></i></a>\r\n                                        <a href=\"#\" class=\"google\"><i class=\"fa fa-google-plus fa-fw\"></i></a>\r\n                                        <a href=\"#\" class=\"twitter\"><i class=\"fa fa-twitter fa-fw\"></i></a>\r\n                                    </div>\r\n                                </div>\r\n                            </div> <!-- end back panel -->\r\n                        </div> <!-- end complaint -->\r\n                    </div> <!-- end complaint-container -->\r\n                </div> <!-- end col-sm-3 -->\r\n            </div>\r\n        </div><!-- End of Row -->\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1\">\r\n                <div class=\"loading-btn\">\r\n                    <a href=\"#\">Load More Complaints </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </section>\r\n    <!-- Main Content -->\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1\">\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <hr>");}]);