// "use strict";
/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const ax=require('axios');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config()
const { User, Context, newGuid, UserFilter, MreArgumentError } = require("@microsoft/mixed-reality-extension-sdk");
var MRE = require("@microsoft/mixed-reality-extension-sdk");
/**
 * The main class of this app. All the logic goes here.
 */
var HelloWorld = /** @class */ (function () {
    function HelloWorld(context) {
        var _this = this;
        this.context = context;
        this.text = null;
        this.cube = null;
        this.context.onStarted(function () { return _this.started(); });
        
    }
    /**
     * Once the context is "started", initialize the app.
     */
    HelloWorld.prototype.started = function () {
        return __awaiter(this, void 0, void 0, function () {
            var spinAnimData, cubeData, flipAnimData, flipAnim, buttonBehavior;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // set up somewhere to store loaded assets (meshes, textures, animations, gltfs, etc.)
                        this.assets = new MRE.AssetContainer(this.context);
                        // Create a new actor with no mesh, but some text.
                        this.text = MRE.Actor.Create(this.context, {
                            actor: {
                                name: 'Text',
                                
                                transform: {
                                    app: { position: { x: 0, y: 0.5, z: 0 } }
                                },
                                text: {
                                    contents: "Ideas And Suggestions",
                                    anchor: MRE.TextAnchorLocation.MiddleCenter,
                                    color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
                                    height: 0.3
                                }
                            }
                        });
                        spinAnimData = this.assets.createAnimationData(
                        // The name is a unique identifier for this data. You can use it to find the data in the asset container,
                        // but it's merely descriptive in this sample.
                        "Spin", {
                            // Animation data is defined by a list of animation "tracks": a particular property you want to change,
                            // and the values you want to change it to.
                            tracks: [{
                                    // This animation targets the rotation of an actor named "text"
                                    target: MRE.ActorPath("text").transform.local.rotation,
                                    // And the rotation will be set to spin over 20 seconds
                                    keyframes: this.generateSpinKeyframes(20, MRE.Vector3.Up()),
                                    // And it will move smoothly from one frame to the next
                                    easing: MRE.AnimationEaseCurves.Linear
                                }]
                        });
                        // Once the animation data is created, we can create a real animation from it.
                        spinAnimData.bind(
                        // We assign our text actor to the actor placeholder "text"
                        { text: this.text }, 
                        // And set it to play immediately, and bounce back and forth from start to end
                        { isPlaying: true, wrapMode: MRE.AnimationWrapMode.PingPong });
                        return [4 /*yield*/, this.assets.loadGltf('stars.glb', "box")];
                    case 1:
                        cubeData = _a.sent();
                        // spawn a copy of the glTF model
                        this.cube = MRE.Actor.CreateFromPrefab(this.context, {
                            // using the data we loaded earlier
                            firstPrefabFrom: cubeData,
                            // Also apply the following generic actor properties.
                            actor: {
                                name: 'Toe Logo',
                                // Parent the glTF model to the text actor, so the transform is relative to the text
                                parentId: this.text.id,
                                
                                transform: {
                                    local: {
                                        position: { x: 0, y: -1, z: 0 },
                                        scale: { x: 1.5, y: 1.5, z: 1.5 }
                                    }
                                }
                            }
                        });
                        flipAnimData = this.assets.createAnimationData(
                        // the animation name
                        "DoAFlip", { tracks: [{
                                    // applies to the rotation of an unknown actor we'll refer to as "target"
                                    target: MRE.ActorPath("target").transform.local.rotation,
                                    // do a spin around the X axis over the course of one second
                                    keyframes: this.generateSpinKeyframes(1.0, MRE.Vector3.Right()),
                                    // and do it smoothly
                                    easing: MRE.AnimationEaseCurves.Linear
                                }] });
                        return [4 /*yield*/, flipAnimData.bind({ target: this.cube })];
                    case 2:
                        flipAnim = _a.sent();
                        buttonBehavior = this.cube.setBehavior(MRE.ButtonBehavior);
                        // Trigger the grow/shrink animations on hover.
                        buttonBehavior.onHover('enter', function () {
                            // use the convenience function "AnimateTo" instead of creating the animation data in advance
                            MRE.Animation.AnimateTo(_this.context, _this.cube, {
                                destination: { transform: { local: { scale: { x: 1.2, y: 1.3, z: 1.2 } } } },
                                duration: 0.3,
                                easing: MRE.AnimationEaseCurves.EaseOutSine
                            });
                        });
                        buttonBehavior.onHover('exit', function () {
                            
                            MRE.Animation.AnimateTo(_this.context, _this.cube, {
                                destination: { transform: { local: { scale: { x: 0.7, y: 0.7, z: 0.7} } } },
                                duration: 0.3,
                                easing: MRE.AnimationEaseCurves.EaseOutSine
                            });
                        });
                        // When clicked, do a 360 sideways.
                        // Send a message to discord using openai
                        function sendToDiscord(message, user) {
                            
                            const l = [`Thanks for the contribution `+user,user +`just dropped some change in the basket just now. Thanks`, user+ ` FRFR Thanks for the idea`,user+ ` thanks`]
                            y=Math.floor((Math.random() * l.length));            
                            
                            sugMessage= user+" just submmited\n-----------\n"+message
                           
                            
                            ax.post('https://discord.com/api/webhooks/906378916367847444/9JTWcdIC0N7_3ICzR1nl3uR_4efHWSvM9MxhVZlY6z8gYUSkijxGd9gBbmozPC0FOZS1',{'content':sugMessage});
                            
                            ax.post("https://discord.com/api/webhooks/908839031066996849/OG8FNOjcGtlqrWNQvjBOKb0r489RK3gzQjtbr7_S763CFk1L409xr3Un8D2Xyh9H58JS",{'content' : l[y]});
                        }
                        
                        buttonBehavior.onClick(function (_) {
                            var us = new User(_,newGuid());
                            us.context.prompt("ANY AND EVERYTHING", false)
                            .then((i)=>{if (i.submitted==true) {
                                us.context.prompt("Go on ", true).then((e)=>{if (e.submitted==true) {
                                    sendToDiscord(e.text,us.context.name);  
                                } us.context.prompt("Thanks ", false)}
                               )
                          
                            };
                                // 
                            
                        
                        
                        });
                        
                        }
                                  
                         
                           
                           
                        );
                        return [2 /*return*/];
                    case 2:

                }
            });
        });
    };
    /**
     * Generate keyframe data for a simple spin animation.
     * @param duration The length of time in seconds it takes to complete a full revolution.
     * @param axis The axis of rotation in local space.
     */
    HelloWorld.prototype.generateSpinKeyframes = function (duration, axis) {
        return [{
                time: 0 * duration,
                value: MRE.Quaternion.RotationAxis(axis, 0)
            }, {
                time: 0.25 * duration,
                value: MRE.Quaternion.RotationAxis(axis, Math.PI / 2)
            }, {
                time: 0.5 * duration,
                value: MRE.Quaternion.RotationAxis(axis, Math.PI)
            }, {
                time: 0.75 * duration,
                value: MRE.Quaternion.RotationAxis(axis, 3 * Math.PI / 2)
            }, {
                time: 1 * duration,
                value: MRE.Quaternion.RotationAxis(axis, 2 * Math.PI)
            }];
    };
    return HelloWorld;
}());
exports.default = HelloWorld;
