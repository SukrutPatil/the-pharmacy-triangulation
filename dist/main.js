/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "6f5f25a0d97a20058945";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(2);

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function(updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(3)(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function(err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?100"))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};

module.exports.formatError = function(err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(2);

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(5);
const app_module_1 = __webpack_require__(6);
const path_1 = __webpack_require__(46);
const session = __webpack_require__(47);
const express = __webpack_require__(11);
const rateLimit = __webpack_require__(48);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets(path_1.resolve('./src/'));
    app.setBaseViewsDir(path_1.resolve('./src/views'));
    app.setViewEngine('ejs');
    app.enableCors();
    app.use(express.urlencoded({
        extended: true,
    }));
    app.set('trust proxy', 1);
    app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
    app.use(express.json());
    app.use(session({
        secret: 'MadeByJaskiratSukrutSumit',
        resave: true,
        saveUninitialized: false,
    }));
    await app.listen(process.env.PORT || 8000);
}
bootstrap();


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const security_service_1 = __webpack_require__(7);
const common_1 = __webpack_require__(8);
const app_controller_1 = __webpack_require__(10);
const app_service_1 = __webpack_require__(12);
const database_service_1 = __webpack_require__(13);
const model_service_1 = __webpack_require__(17);
const auth_module_1 = __webpack_require__(19);
const security_module_1 = __webpack_require__(22);
const admin_module_1 = __webpack_require__(23);
const model_module_1 = __webpack_require__(32);
const session_executor_module_1 = __webpack_require__(31);
const user_module_1 = __webpack_require__(35);
const platform_express_1 = __webpack_require__(26);
const products_module_1 = __webpack_require__(37);
const products_service_1 = __webpack_require__(16);
const module_service_1 = __webpack_require__(30);
const module_controller_1 = __webpack_require__(34);
const database_module_1 = __webpack_require__(20);
const api_module_1 = __webpack_require__(39);
const payment_module_1 = __webpack_require__(40);
const module_module_1 = __webpack_require__(33);
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            security_module_1.SecurityModule,
            admin_module_1.AdminModule,
            model_module_1.ModelModule,
            session_executor_module_1.SessionExecutorModule,
            user_module_1.UserModule,
            platform_express_1.MulterModule.register({
                dest: './uploads'
            }),
            products_module_1.ProductsModule,
            database_module_1.DatabaseModule,
            api_module_1.ApiModule,
            payment_module_1.PaymentModule,
            module_module_1.ModuleModule
        ],
        controllers: [app_controller_1.AppController, module_controller_1.ModuleController,],
        providers: [app_service_1.AppService,
            database_service_1.DatabaseService, model_service_1.ModelService, security_service_1.SecurityService, products_service_1.ProductsService, module_service_1.ModuleService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SecurityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityService = void 0;
const common_1 = __webpack_require__(8);
const crypto = __webpack_require__(9);
let SecurityService = SecurityService_1 = class SecurityService {
    constructor() {
        this.secureData = (key, value) => {
            const cipher = crypto.createCipher('aes128', key);
            const encrypted = cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
            return encrypted;
        };
        this.retrieveData = (key, value) => {
            const decipher = crypto.createDecipher('aes128', key);
            const decrypted = decipher.update(value, 'hex', 'utf8') + decipher.final('utf8');
            return decrypted;
        };
        console.debug(`SecurityService ${SecurityService_1.callTimes++}`);
    }
};
SecurityService.callTimes = 0;
SecurityService = SecurityService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], SecurityService);
exports.SecurityService = SecurityService;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = __webpack_require__(8);
const express_1 = __webpack_require__(11);
const app_service_1 = __webpack_require__(12);
const database_service_1 = __webpack_require__(13);
const products_service_1 = __webpack_require__(16);
let AppController = class AppController {
    constructor(db, ps, as) {
        this.db = db;
        this.ps = ps;
        this.as = as;
    }
    async getHomePage(req, res) {
        console.log(`Entering HomePage`);
        let allModules = await this.as.getRandomArrayOfModules();
        console.log(allModules);
        const theDBReturnObject = await this.db.retrieve(database_service_1.EntryType.DRUG);
        const prod_id = [];
        const prod_name = [];
        const prod_price = [];
        const prod_img = [];
        if (theDBReturnObject.error) {
            console.debug(`Error Here`);
            res.status(501);
        }
        theDBReturnObject.resultObject.forEach(productEntry => {
            const { id, brandname, mrp, imgaddress } = productEntry;
            prod_id.push(id);
            prod_name.push(brandname);
            prod_price.push(mrp);
            prod_img.push(imgaddress);
        });
        return {
            loggedInUser: req.session.loggedInUser,
            prod_id,
            prod_name: prod_name,
            prod_price: prod_price,
            prod_img: prod_img,
            allModules
        };
    }
    async getListOfAllProductsPage(res) {
        const allProducts = await this.ps.getAllProducts();
        if (!allProducts)
            res.render('404', { errorMessage: 'No Products found in database. ' });
        res.render('ListOfAllProducts', { allProducts });
    }
    getAboutUSPage() {
        return {};
    }
};
__decorate([
    common_1.Get(),
    common_1.Render('Homepage.ejs'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AppController.prototype, "getHomePage", null);
__decorate([
    common_1.Get('listOfAllProducts'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getListOfAllProductsPage", null);
__decorate([
    common_1.Get('aboutUs'),
    common_1.Render('AboutUs.ejs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getAboutUSPage", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [typeof (_e = typeof database_service_1.DatabaseService !== "undefined" && database_service_1.DatabaseService) === "function" ? _e : Object, typeof (_f = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _f : Object, typeof (_g = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _g : Object])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = __webpack_require__(8);
const database_service_1 = __webpack_require__(13);
let AppService = class AppService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async getRandomArrayOfModules() {
        let modulesQueryReturn = await this.dbService.retrieve(database_service_1.EntryType.MODULE);
        console.log(modulesQueryReturn);
        if (modulesQueryReturn.error) {
            console.log(modulesQueryReturn.error);
            return null;
        }
        if (modulesQueryReturn.resultObject.length == 0) {
            console.log('No Modules Available Yet!');
            return [];
        }
        return this.shuffle(modulesQueryReturn.resultObject);
    }
    shuffle(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof database_service_1.DatabaseService !== "undefined" && database_service_1.DatabaseService) === "function" ? _a : Object])
], AppService);
exports.AppService = AppService;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = exports.QueryStatus = exports.EntryType = void 0;
const common_1 = __webpack_require__(8);
const pgp = __webpack_require__(14);
const jsonData = __webpack_require__(15);
var EntryType;
(function (EntryType) {
    EntryType[EntryType["PRODUCT"] = 0] = "PRODUCT";
    EntryType[EntryType["MODULE"] = 1] = "MODULE";
    EntryType[EntryType["TRANSACTION"] = 2] = "TRANSACTION";
    EntryType[EntryType["MEMBER"] = 3] = "MEMBER";
    EntryType[EntryType["SESSION"] = 4] = "SESSION";
    EntryType[EntryType["DRUG"] = 5] = "DRUG";
    EntryType[EntryType["ARTICLE"] = 6] = "ARTICLE";
    EntryType[EntryType["USER"] = 7] = "USER";
    EntryType[EntryType["CHAT"] = 8] = "CHAT";
    EntryType[EntryType["ADDRESS"] = 9] = "ADDRESS";
})(EntryType = exports.EntryType || (exports.EntryType = {}));
var QueryStatus;
(function (QueryStatus) {
    QueryStatus[QueryStatus["FAILED"] = 0] = "FAILED";
    QueryStatus[QueryStatus["SUCCESSFULL"] = 1] = "SUCCESSFULL";
})(QueryStatus = exports.QueryStatus || (exports.QueryStatus = {}));
const ADDRESS_TABLE_DEFINITION = {
    tableName: 'addressledger',
    columnNames: ['id', 'al1', 'al2', 'al3', 'pincode'],
};
const MEMBER_TABLE_DEFINITION = {
    tableName: 'MemberLedger',
    columnNames: ['email', 'membership', 'name', 'password', 'phone', 'admin'],
};
const TRANSACTION_TABLE_DEFINITION = {
    tableName: 'TransactionLedger',
    columnNames: [
        'transactionId',
        'buyerName',
        'address',
        'phone',
        'email',
        'productId',
    ],
};
const CHAT_TABLE_DEFINITION = {
    tableName: 'chatledger',
    columnNames: ['moduleid', 'sender', 'chat', 'chatid'],
};
const PRODUCT_TABLE_DEFINITION = {
    tableName: 'ProductLedger',
    columnNames: [
        'productId',
        'name',
        'price',
        'info',
        'numberOfItemsInStock',
        'productThumbnailImgSrc',
        'productCategory',
    ],
};
const MODULE_TABLE_DEFINITION = {
    tableName: 'ModuleLedger',
    columnNames: [
        'id',
        'name',
        'description',
        'price',
        'category',
        'thumbnail',
        'video',
        'articletitle',
        'article',
        'adminEmail',
        'dop',
    ],
};
const USER_TABLE_DEFINITION = {
    tableName: 'UserLedger',
    columnNames: [
        'userid',
        'email',
        'password',
        'username',
        'memtype',
        'phoneno',
    ],
};
const DRUG_TABLE_DEFINITION = {
    tableName: 'DrugLedger',
    columnNames: [
        'id',
        'brandName',
        'brandCode',
        'strnth',
        'qty',
        'packing',
        'sku',
        'manufacturer',
        'marketedby',
        'batchno',
        'hsncode',
        'mfgdate',
        'expdate',
        'mrp',
        'purchaseprice',
        'rate',
        'sgst',
        'cgst',
        'costvar',
        'imgaddress',
        'adminemail',
    ],
};
const SESSION_TABLE_DEFINITION = {
    tableName: 'SessionLedger',
    columnNames: [
        'name',
        'email',
        'phone',
        'category',
        'counsellingDate',
        'sessionId',
    ],
};
const ARTICLE_TABLE_DEFINITION = {
    tableName: 'ArticleLedger',
    columnNames: [
        'id',
        'name',
        'about',
        'admin',
        'publisher',
        'thumbnail',
        'otherimages',
        'dop',
    ],
};
let self;
let DatabaseService = DatabaseService_1 = class DatabaseService {
    constructor() {
        this.db = pgp({})(jsonData);
        this.self = this;
        this.addUser = async (userObject) => { };
        this.addChat = async (chatObject) => {
            const insertQuerySkeleton = `insert into pharmaschema."${CHAT_TABLE_DEFINITION.tableName}"(${CHAT_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4)`;
            const { moduleid, sender, chat, chatid } = chatObject;
            const values = [moduleid, sender, chat, chatid];
            const returnObject = {
                status: QueryStatus.SUCCESSFULL,
            };
            returnObject.resultObject = await this.db.any(insertQuerySkeleton, values);
            return returnObject;
        };
        this.addDrug = async (drugObject) => {
            const insertQuerySkeleton = `insert into pharmaschema."${DRUG_TABLE_DEFINITION.tableName}"(${DRUG_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22)`;
            const { id, batchno, brandCode, brandName, cgst, costvar, expdate, hsncode, manufacturer, marketedby, mfgdate, mrp, packing, purchaseprice, qty, rate, sgst, sku, strnth, imgaddress, adminemail, name, } = drugObject;
            const values = [
                id,
                brandName,
                brandCode,
                strnth,
                qty,
                packing,
                sku,
                manufacturer,
                marketedby,
                batchno,
                hsncode,
                mfgdate,
                expdate,
                mrp,
                purchaseprice,
                rate,
                sgst,
                cgst,
                costvar,
                imgaddress,
                adminemail,
                name,
            ];
            const returnObject = {
                status: QueryStatus.SUCCESSFULL,
            };
            returnObject.resultObject = await this.db.any(insertQuerySkeleton, values);
            return returnObject;
        };
        this.addArticle = async (articleObject) => {
            const insertQuerySkeleton = `insert into pharmaschema."${ARTICLE_TABLE_DEFINITION.tableName}"(${ARTICLE_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4,$5,$6,$7,$8)`;
            const { id, about, admin, name, otherimages, publisher, thumbnail, dop, } = articleObject;
            const values = [
                id,
                name,
                about,
                admin,
                publisher,
                thumbnail,
                otherimages,
                dop,
            ];
            const returnObject = {
                status: QueryStatus.SUCCESSFULL,
            };
            returnObject.resultObject = await this.db.any(insertQuerySkeleton, values);
            return returnObject;
        };
        this.addAddress = async (theAddressObject) => {
            const insertQuerySkeleton = `insert into pharmaschema."${ADDRESS_TABLE_DEFINITION.tableName}"(${ADDRESS_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4,$5)`;
            const { id, al1, al2, al3, pincode } = theAddressObject;
            const values = [id, al1, al2, al3, pincode];
            const query = {
                text: insertQuerySkeleton,
                values: values,
                rowMode: 'array',
            };
            console.log(query);
            const returnObject = {
                status: QueryStatus.SUCCESSFULL,
            };
            returnObject.resultObject = await this.db.any(insertQuerySkeleton, values);
            return returnObject;
        };
        this.addModule = async (theModuleObject) => {
            const insertQuerySkeleton = `insert into pharmaschema."${MODULE_TABLE_DEFINITION.tableName}"(${MODULE_TABLE_DEFINITION.columnNames.toString()}) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`;
            const { id, adminEmail, article, articletitle, category, description, dop, name, price, thumbnail, video, } = theModuleObject;
            const values = [
                id,
                name,
                description,
                price,
                category,
                thumbnail,
                video,
                articletitle,
                article,
                adminEmail,
                dop,
            ];
            const query = {
                text: insertQuerySkeleton,
                values: values,
                rowMode: 'array',
            };
            const returnObject = {
                status: QueryStatus.SUCCESSFULL,
            };
            returnObject.resultObject = this.db.any(insertQuerySkeleton, values);
            return returnObject;
        };
        this.retrieve = async (etype, optionalWhereClause = '') => {
            let tblname;
            switch (etype) {
                case EntryType.DRUG:
                    tblname = DRUG_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.MEMBER:
                    tblname = MEMBER_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.MODULE:
                    tblname = MODULE_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.PRODUCT:
                    tblname = PRODUCT_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.SESSION:
                    tblname = SESSION_TABLE_DEFINITION.tableName;
                case EntryType.TRANSACTION:
                    tblname = TRANSACTION_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.ARTICLE:
                    tblname = ARTICLE_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.USER:
                    tblname = USER_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.CHAT:
                    tblname = CHAT_TABLE_DEFINITION.tableName;
                    break;
                case EntryType.ADDRESS:
                    tblname = ADDRESS_TABLE_DEFINITION.tableName;
                    break;
            }
            const objectToResolve = {
                status: QueryStatus.SUCCESSFULL,
            };
            const theQuery = `select * from pharmaschema."${tblname}" ${optionalWhereClause};`;
            console.log(theQuery);
            objectToResolve.resultObject = await this.db.any(theQuery);
            return objectToResolve;
        };
        this.generateInsertQuerySkeleton = (tableDefinition) => {
            const theQuery = `insert into pharmaschema."${tableDefinition.tableName}"(${tableDefinition.columnNames.toString()}) VALUES ?`;
            return theQuery;
        };
        this.getEntryType = () => {
            return EntryType;
        };
        console.debug(`DatabaseService ${DatabaseService_1.callTimes++}`);
    }
};
DatabaseService.callTimes = 0;
DatabaseService = DatabaseService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], DatabaseService);
exports.DatabaseService = DatabaseService;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("pg-promise");

/***/ }),
/* 15 */
/***/ (function(module) {

module.exports = JSON.parse("{\"user\":\"postgres\",\"host\":\"database-1.cebfk17vw9sb.ap-south-1.rds.amazonaws.com\",\"database\":\"pharmadb\",\"password\":\"password\",\"port\":5432}");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ProductsService_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = __webpack_require__(8);
const database_service_1 = __webpack_require__(13);
let ProductsService = ProductsService_1 = class ProductsService {
    constructor(dbService) {
        this.dbService = dbService;
        console.debug(`ProductsService ${ProductsService_1.callTimes++}`);
    }
    async getAllProducts() {
        const dbReturnObject = await this.dbService.retrieve(database_service_1.EntryType.DRUG);
        if (dbReturnObject.error) {
            return null;
        }
        const allRows = dbReturnObject.resultObject;
        return allRows;
    }
    async getParticularProduct(id) {
        const allProducts = await this.getAllProducts();
        if (!allProducts) {
            return null;
        }
        const theProduct = allProducts.find((product) => {
            return product.id === id;
        });
        return theProduct ? theProduct : null;
    }
};
ProductsService.callTimes = 0;
ProductsService = ProductsService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof database_service_1.DatabaseService !== "undefined" && database_service_1.DatabaseService) === "function" ? _a : Object])
], ProductsService);
exports.ProductsService = ProductsService;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ModelService_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelService = exports.ModuleType = void 0;
const common_1 = __webpack_require__(8);
const crypticKeyGenerator = __webpack_require__(18);
const security_service_1 = __webpack_require__(7);
const dateFetch = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
};
var ModuleType;
(function (ModuleType) {
    ModuleType[ModuleType["DIET"] = 0] = "DIET";
    ModuleType[ModuleType["CAREER"] = 1] = "CAREER";
    ModuleType[ModuleType["ENTREPRENEURSHIP"] = 2] = "ENTREPRENEURSHIP";
    ModuleType[ModuleType["MEDICATION"] = 3] = "MEDICATION";
})(ModuleType = exports.ModuleType || (exports.ModuleType = {}));
var RandomIdType;
(function (RandomIdType) {
    RandomIdType[RandomIdType["TRANSACTION"] = 0] = "TRANSACTION";
    RandomIdType[RandomIdType["PRODUCT"] = 1] = "PRODUCT";
    RandomIdType[RandomIdType["MODULE"] = 2] = "MODULE";
    RandomIdType[RandomIdType["ARTICLE"] = 3] = "ARTICLE";
    RandomIdType[RandomIdType["SESSION"] = 4] = "SESSION";
    RandomIdType[RandomIdType["CHAT"] = 5] = "CHAT";
    RandomIdType[RandomIdType["ADDRESS"] = 6] = "ADDRESS";
})(RandomIdType || (RandomIdType = {}));
let ModelService = ModelService_1 = class ModelService {
    constructor(securityService) {
        this.securityService = securityService;
        this.createAddressObject = (al1, al2, al3, pincode) => {
            al2 = al2 ? al2 : ' ';
            return { id: this.generateUniqueID(RandomIdType.ADDRESS), al1, al2, al3, pincode };
        };
        this.createArticleObject = (name, publisher, about, admin, thumbnail, otherimages) => {
            const id = this.generateUniqueID(RandomIdType.ARTICLE);
            const dop = dateFetch();
            return { id, about, admin, name, otherimages, publisher, thumbnail, dop };
        };
        this.createUserObject = (username, email, password, memtype, phoneno) => {
            return { username, email, password, memtype: memtype.split(','), phoneno };
        };
        this.createMemberObject = (name, email, phone, pwd, membershipType, isAdmin) => {
            isAdmin = isAdmin ? 'YES' : 'NO';
            const password = this.securityService.secureData(`${name}${email}`, pwd);
            return {
                name,
                email,
                phone,
                password,
                membershipType,
                isAdmin,
            };
        };
        this.createChatObject = (moduleid, sender, chat) => {
            return {
                chatid: this.generateUniqueID(RandomIdType.CHAT),
                moduleid,
                sender,
                chat,
            };
        };
        this.createDrugObject = (name, brand_name, brand_code, strength, qty, packing, manufacturer, marketedby, batch_number, hsn_code, mfg_date, exp_date, product_mrp, product_purchase_price, product_rate, product_sgst, product_cgst, product_cost_var, product_sku, imgaddress, adminemail) => {
            const id = this.generateUniqueID(RandomIdType.PRODUCT);
            return {
                id: id,
                name: name,
                brandName: brand_name,
                batchno: batch_number,
                brandCode: brand_code,
                cgst: product_cgst,
                costvar: product_cost_var,
                expdate: exp_date,
                hsncode: hsn_code,
                manufacturer: manufacturer,
                marketedby: marketedby,
                mfgdate: mfg_date,
                mrp: product_mrp,
                packing: packing,
                purchaseprice: product_purchase_price,
                qty: qty,
                rate: product_rate,
                sgst: product_sgst,
                sku: product_sku,
                strnth: strength,
                imgaddress: imgaddress,
                adminemail: adminemail,
            };
        };
        this.createModuleObject = (name, description, price, category, thumbnail, video, articletitle, article, adminEmail) => {
            const id = this.generateUniqueID(RandomIdType.MODULE);
            const dop = dateFetch();
            return {
                id,
                adminEmail,
                article,
                articletitle,
                category,
                description,
                dop,
                name,
                price,
                thumbnail,
                video,
            };
        };
        this.createTransactionObject = (buyerName, address, phone, email, product_id) => {
            const transactionId = this.generateUniqueID(RandomIdType.TRANSACTION);
            return { transactionId, address, buyerName, email, phone, product_id };
        };
        this.generateUniqueID = (rt) => {
            let prefix;
            switch (rt) {
                case RandomIdType.PRODUCT:
                    prefix = `PRO`;
                    break;
                case RandomIdType.MODULE:
                    prefix = `MOD`;
                    break;
                case RandomIdType.TRANSACTION:
                    prefix = `TRS`;
                    break;
                case RandomIdType.ARTICLE:
                    prefix = `ART`;
                    break;
                case RandomIdType.SESSION:
                    prefix = 'SESS';
                    break;
                case RandomIdType.CHAT:
                    prefix = 'CHAT';
                    break;
                case RandomIdType.ADDRESS:
                    prefix = 'ADDR';
                    break;
            }
            const suffix = crypticKeyGenerator({ length: 7 }) + Date.now().toString();
            return `${prefix}${suffix}`;
        };
        console.debug(`ModelService ${ModelService_1.callTimes++}`);
    }
};
ModelService.callTimes = 0;
ModelService = ModelService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof security_service_1.SecurityService !== "undefined" && security_service_1.SecurityService) === "function" ? _a : Object])
], ModelService);
exports.ModelService = ModelService;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("crypto-random-string");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = __webpack_require__(8);
const database_module_1 = __webpack_require__(20);
const auth_controller_1 = __webpack_require__(21);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        controllers: [auth_controller_1.AuthController],
        imports: [database_module_1.DatabaseModule]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(8);
const database_service_1 = __webpack_require__(13);
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    common_1.Module({
        providers: [database_service_1.DatabaseService],
        exports: [database_service_1.DatabaseService]
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = __webpack_require__(8);
const database_service_1 = __webpack_require__(13);
const database_service_2 = __webpack_require__(13);
const express_1 = __webpack_require__(11);
let AuthController = class AuthController {
    constructor(DBService) {
        this.DBService = DBService;
    }
    getLoginPage() {
        return {};
    }
    getSignupPage() {
        throw new Error('Method not implemented.');
    }
    async postLoginInformation(req, res) {
        const { email, password } = req.body;
        const theResultSet = await this.DBService.retrieve(database_service_2.EntryType.MEMBER, `where email = '${email}'`);
        if (theResultSet.status == database_service_2.QueryStatus.FAILED) {
            console.log('Here');
            console.log(theResultSet.error);
            res.status(501).redirect('../');
        }
        else {
            const theResultObject = theResultSet.resultObject;
            if (theResultObject.length == 0) {
                console.log('Zero');
                res.render('Login', { userNotFound: true }, (err, html) => {
                    if (err)
                        res.status(501).send('../');
                    else
                        res.send(html);
                });
            }
            else if (theResultObject.length == 1) {
                console.log('One');
                req.session.loggedInUser = theResultObject[0].name;
                res.redirect('../');
            }
            else {
                console.log('More than one');
                console.log(`Multiple Rows Captured At Database on entering email = ${email} and password = ${password}`);
                res.status(501).redirect('../');
            }
        }
    }
    getMembersipForm(req, res) {
        return {};
    }
    signoutAction(req, res) {
        var _a;
        delete req.session.loggedInUser;
        (_a = req.session) === null || _a === void 0 ? true : delete _a.adminEmail;
        res.redirect('./login');
    }
};
__decorate([
    common_1.Get('login'),
    common_1.Render('Login.ejs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AuthController.prototype, "getLoginPage", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthController.prototype, "postLoginInformation", null);
__decorate([
    common_1.Get('membership'),
    common_1.Render('BecomeAMember.ejs'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "getMembersipForm", null);
__decorate([
    common_1.Get('signout'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _f : Object, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "signoutAction", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [typeof (_h = typeof database_service_1.DatabaseService !== "undefined" && database_service_1.DatabaseService) === "function" ? _h : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityModule = void 0;
const common_1 = __webpack_require__(8);
const security_service_1 = __webpack_require__(7);
let SecurityModule = class SecurityModule {
};
SecurityModule = __decorate([
    common_1.Module({
        providers: [security_service_1.SecurityService],
        exports: [security_service_1.SecurityService]
    })
], SecurityModule);
exports.SecurityModule = SecurityModule;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = __webpack_require__(8);
const admin_controller_1 = __webpack_require__(24);
const session_executor_module_1 = __webpack_require__(31);
const database_module_1 = __webpack_require__(20);
const model_module_1 = __webpack_require__(32);
const security_module_1 = __webpack_require__(22);
const module_module_1 = __webpack_require__(33);
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    common_1.Module({
        controllers: [admin_controller_1.AdminController],
        imports: [session_executor_module_1.SessionExecutorModule, database_module_1.DatabaseModule, model_module_1.ModelModule, security_module_1.SecurityModule, module_module_1.ModuleModule]
    })
], AdminModule);
exports.AdminModule = AdminModule;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const session_executor_service_1 = __webpack_require__(25);
const common_1 = __webpack_require__(8);
const express_1 = __webpack_require__(11);
const model_service_1 = __webpack_require__(17);
const database_service_1 = __webpack_require__(13);
const platform_express_1 = __webpack_require__(26);
const multer = __webpack_require__(27);
const mime = __webpack_require__(28);
const fs = __webpack_require__(29);
const module_service_1 = __webpack_require__(30);
let theFileName = '', theModuleThumbnail = '', theModuleVideo = '';
let theOtherImagesArray = [];
let self;
const multerOptions = {
    storage: multer.diskStorage({
        destination: (_, file, cb) => {
            if (file.fieldname == 'product_thumbnail')
                return cb(null, './uploads/products');
            else if (file.fieldname == 'article_thumbnail')
                return cb(null, './uploads/articles/thumbnail');
            else if (file.fieldname == 'article_otherimages[]')
                return cb(null, './uploads/articles/other');
            else if (file.fieldname == 'moduleThumbnail')
                return cb(null, './uploads/modules/thumbnail');
            else if (file.fieldname == 'moduleVideo')
                return cb(null, './uploads/modules/video');
        },
        filename: (_, file, cb) => {
            const match = ['image/png', 'image/jpeg', 'video/mp4'];
            if (match.indexOf(file.mimetype) === -1) {
                const errorMessage = {
                    message: 'Invalid File',
                    name: 'INVALID_EXTENSION',
                };
                return cb(errorMessage, null);
            }
            let filename;
            if (file.fieldname.startsWith('article'))
                filename = `ART${Date.now()}.${mime.getExtension(file.mimetype)}`;
            else
                filename = `${file.fieldname}-${Date.now()}.${mime.getExtension(file.mimetype)}`;
            if (file.fieldname != 'article_otherimages[]')
                theFileName = filename;
            if (file.fieldname == 'article_otherimages[]')
                theOtherImagesArray.push(theFileName);
            if (file.fieldname == 'moduleThumbnail')
                theModuleThumbnail = filename;
            if (file.fieldname == 'moduleVideo')
                theModuleVideo = filename;
            return cb(null, filename);
        },
    }),
};
let AdminController = class AdminController {
    constructor(se, mg, db, ms) {
        this.se = se;
        this.mg = mg;
        this.db = db;
        this.ms = ms;
    }
    getAdminLogin() {
        return { userNotFoundError: 'No' };
    }
    async adminLoginAction(req, res) {
        const { adminEmail, adminPassword } = req.body;
        const theDatabaseReturnObject = await this.db.retrieve(database_service_1.EntryType.MEMBER, `where email = '${adminEmail}' and admin = 'yes' and password = '${adminPassword}'`);
        if (theDatabaseReturnObject.error) {
            console.debug(theDatabaseReturnObject.error);
        }
        if (theDatabaseReturnObject.resultObject.length == 0) {
            console.debug(`No Admin Found`);
        }
        else if (theDatabaseReturnObject.resultObject.length != 1) {
            console.debug(`Internal Error: 501`);
        }
        else {
            req.session.loggedInUser =
                theDatabaseReturnObject.resultObject[0].name;
            req.session.adminEmail = adminEmail;
            res.redirect('products');
        }
    }
    getProducts(req, res) {
        this.se.adminSessionExecutor(req, res, async () => {
            const { adminEmail } = req.session;
            const theDBReturnObject = await this.db.retrieve(database_service_1.EntryType.DRUG, `where adminemail = '${adminEmail}'`);
            if (theDBReturnObject.error) {
                console.debug(theDBReturnObject.error);
                res.status(501).redirect('../');
            }
            else {
                const allRows = theDBReturnObject === null || theDBReturnObject === void 0 ? void 0 : theDBReturnObject.resultObject;
                const arrayOfProductIds = [];
                const arrayOfImageAddresses = [];
                const arrayOfRegularPrices = [];
                const arrayOfSalePrices = [];
                const arrayOfBrandNames = [];
                allRows.forEach(row => {
                    arrayOfProductIds.push(row.id);
                    arrayOfImageAddresses.push(row.imgaddress);
                    arrayOfRegularPrices.push(row.mrp);
                    arrayOfSalePrices.push(row.purchaseprice);
                    arrayOfBrandNames.push(row.brandname);
                });
                res.render('AllProducts', {
                    arrayOfProductIds: arrayOfProductIds,
                    arrayOfImageAddresses: arrayOfImageAddresses,
                    arrayOfRegularPrices: arrayOfRegularPrices,
                    arrayOfSalePrices: arrayOfSalePrices,
                    arrayOfBrandNames: arrayOfBrandNames,
                }, (err, html) => {
                    if (err) {
                        console.debug(err);
                        res.status(501).redirect('../');
                    }
                    res.send(html);
                });
            }
        }, () => {
            res.status(301).redirect('login');
        });
    }
    getNewProductPage(req, res) {
        this.se.adminSessionExecutor(req, res, () => {
            res.render('NewProduct', {});
        }, () => {
            res.status(301).redirect('login');
        });
    }
    async createNewProduct(req, res) {
        const { name, brand_name, brand_code, strength, qty, packing, manufacturer, marketedby, batch_number, hsn_code, mfg_date, exp_date, product_mrp, product_purchase_price, product_rate, product_sgst, product_cgst, product_cost_var, product_sku, } = req.body;
        console.log(req.body);
        const theDrugObject = this.mg.createDrugObject(name, brand_name, brand_code, strength, qty, packing, manufacturer, marketedby, batch_number, hsn_code, mfg_date, exp_date, product_mrp, product_purchase_price, product_rate, product_sgst, product_cgst, product_cost_var, product_sku, theFileName, req.session.adminEmail);
        console.log('To Database Service');
        const returnedObject = await this.db.addDrug(theDrugObject);
        if (returnedObject.error)
            console.log(returnedObject.error);
        res.redirect('products');
    }
    getAllArticles(req, res) {
        this.se.adminSessionExecutor(req, res, async () => {
            const theDBReturnObject = await this.db.retrieve(database_service_1.EntryType.ARTICLE, `where admin = '${req.session.adminEmail}'`);
            if (theDBReturnObject.error) {
                console.debug('Internal Error Here');
                res.status(501).redirect('../');
            }
            else {
                const artThumbnailArray = [];
                const artNameArray = [];
                const artPublisherArray = [];
                const artDopArray = [];
                theDBReturnObject.resultObject.forEach(row => {
                    artThumbnailArray.push(row.thumbnail);
                    artNameArray.push(row.name);
                    artPublisherArray.push(row.publisher);
                    artDopArray.push(row.dop);
                });
                res.render('AllArticles', {
                    artThumbnailArray: artThumbnailArray,
                    artNameArray: artNameArray,
                    artPublisherArray: artPublisherArray,
                    artDopArray: artDopArray,
                });
            }
        }, () => {
            res.status(301).redirect('login');
        });
    }
    getNewArticlePage(req, res) {
        this.se.adminSessionExecutor(req, res, () => {
            res.render('NewArticle', {});
        }, () => {
            res.status(301).redirect('login');
        });
    }
    createNewArticle(req, res) {
        this.se.adminSessionExecutor(req, res, async () => {
            const { article_name, article_publisher_name, article_about, article_article, } = req.body;
            const theArticleObject = this.mg.createArticleObject(article_name, article_publisher_name, article_about, req.session.adminEmail, theFileName, theOtherImagesArray.toString());
            const theDatabaseReturnObject = await this.db.addArticle(theArticleObject);
            if (theDatabaseReturnObject.error) {
                console.debug(theDatabaseReturnObject.error);
                res.status(501).redirect('../');
            }
            else {
                fs.writeFile(`Articles/${theArticleObject.id}.md`, article_article, err => {
                    if (err)
                        console.debug(`Error Occured While Writing File: ${err}`);
                    else
                        console.debug(`The File Has Been Written. with details
                      ${article_article}`);
                    res.redirect('./articles');
                });
            }
        }, () => {
            res.redirect('login');
        });
        theOtherImagesArray = [];
    }
    async getAllModule(req, res) {
        const allModules = await this.ms.getAllModules();
        this.se.adminSessionExecutor(req, res, () => {
            if (!allModules) {
                res.render('404', {});
                return;
            }
            res.render('AllModules', { allModules });
        }, () => {
            res.status(301).redirect('login');
        });
    }
    getNewModulePage(req, res) {
        this.se.adminSessionExecutor(req, res, () => {
            res.render('NewModule', {});
        }, () => {
            res.status(301).redirect('login');
        });
    }
    createNewModule(req, res) {
        this.se.adminSessionExecutor(req, res, async () => {
            const { module_name, module_desc, module_price, module_type, module_article_title, module_article, } = req.body;
            const theModuleObject = this.mg.createModuleObject(module_name, module_desc, module_price, module_type, theModuleThumbnail, theModuleVideo, module_article_title, module_article, req.session.adminEmail);
            const theDBReturnObject = await this.db.addModule(theModuleObject);
            if (theDBReturnObject.error)
                console.log(theDBReturnObject.error);
            res.redirect('modules');
        }, () => {
            res.status(501).redirect('../');
        });
    }
    getAllSessions(req, res) {
        this.se.adminSessionExecutor(req, res, () => {
            res.render('AllSessions', {});
        }, () => {
            res.status(301).redirect('login');
        });
    }
    getUpdateProductPage(req, res) {
        this.se.adminSessionExecutor(req, res, () => {
            const pID = req.params.id;
            res.render(`UpdateProduct/: ${pID}`, {});
        }, () => {
            res.status(301).redirect('login');
        });
    }
    updateNewProduct(req, res) {
        throw 'expects further implementation';
    }
    getUpdateArticlePage(req, res) {
        this.se.adminSessionExecutor(req, res, () => {
            const aID = req.params.id;
            res.render(`UpdateArticle/: ${aID}`, {});
        }, () => {
            res.status(301).redirect('login');
        });
    }
    updateNewArticle(req, res) {
        throw 'expects further implementation';
    }
    getUpdateModulePage(req, res) {
        this.se.adminSessionExecutor(req, res, () => {
            const mID = req.params.id;
            res.render(`UpdateModule/: ${mID}`, {});
        }, () => {
            res.status(301).redirect('login');
        });
    }
    updateNewModule(req, res) {
        throw 'expects further implementation';
    }
    deleteItem(req, res) {
    }
};
__decorate([
    common_1.Get('login'),
    common_1.Render('AdminLogin.ejs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAdminLogin", null);
__decorate([
    common_1.Post('adminLoginAction'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AdminController.prototype, "adminLoginAction", null);
__decorate([
    common_1.Get('products'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getProducts", null);
__decorate([
    common_1.Get('createNewProduct'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _f : Object, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getNewProductPage", null);
__decorate([
    common_1.Post('newProduct'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('product_thumbnail', 1, multerOptions)),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _h : Object, typeof (_j = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AdminController.prototype, "createNewProduct", null);
__decorate([
    common_1.Get('articles'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _l : Object, typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAllArticles", null);
__decorate([
    common_1.Get('createNewArticle'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _o : Object, typeof (_p = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _p : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getNewArticlePage", null);
__decorate([
    common_1.Post('newArticle'),
    common_1.UseInterceptors(platform_express_1.FileFieldsInterceptor([
        { name: 'article_thumbnail', maxCount: 1 },
        { name: 'article_otherimages[]', maxCount: 3 },
    ], multerOptions)),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _q : Object, typeof (_r = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _r : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "createNewArticle", null);
__decorate([
    common_1.Get('modules'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_s = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _s : Object, typeof (_t = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _t : Object]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], AdminController.prototype, "getAllModule", null);
__decorate([
    common_1.Get('createNewModule'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _v : Object, typeof (_w = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _w : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getNewModulePage", null);
__decorate([
    common_1.Post('newModule'),
    common_1.UseInterceptors(platform_express_1.FileFieldsInterceptor([
        { name: 'moduleThumbnail', maxCount: 1 },
        { name: 'moduleVideo', maxCount: 1 },
    ], multerOptions)),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_x = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _x : Object, typeof (_y = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _y : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "createNewModule", null);
__decorate([
    common_1.Get('sessions'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_z = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _z : Object, typeof (_0 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _0 : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAllSessions", null);
__decorate([
    common_1.Get('updateProduct/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_1 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _1 : Object, typeof (_2 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _2 : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getUpdateProductPage", null);
__decorate([
    common_1.Post('updateProduct'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_3 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _3 : Object, typeof (_4 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _4 : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateNewProduct", null);
__decorate([
    common_1.Get('updateArticle/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_5 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _5 : Object, typeof (_6 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _6 : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getUpdateArticlePage", null);
__decorate([
    common_1.Post('updateArticle'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_7 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _7 : Object, typeof (_8 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _8 : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateNewArticle", null);
__decorate([
    common_1.Get('updateModule/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_9 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _9 : Object, typeof (_10 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _10 : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getUpdateModulePage", null);
__decorate([
    common_1.Post('updateModule'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_11 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _11 : Object, typeof (_12 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _12 : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "updateNewModule", null);
__decorate([
    common_1.Get('delete/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_13 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _13 : Object, typeof (_14 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _14 : Object]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "deleteItem", null);
AdminController = __decorate([
    common_1.Controller('admin'),
    __metadata("design:paramtypes", [typeof (_15 = typeof session_executor_service_1.SessionExecutorService !== "undefined" && session_executor_service_1.SessionExecutorService) === "function" ? _15 : Object, typeof (_16 = typeof model_service_1.ModelService !== "undefined" && model_service_1.ModelService) === "function" ? _16 : Object, typeof (_17 = typeof database_service_1.DatabaseService !== "undefined" && database_service_1.DatabaseService) === "function" ? _17 : Object, typeof (_18 = typeof module_service_1.ModuleService !== "undefined" && module_service_1.ModuleService) === "function" ? _18 : Object])
], AdminController);
exports.AdminController = AdminController;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SessionExecutorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionExecutorService = void 0;
const common_1 = __webpack_require__(8);
let SessionExecutorService = SessionExecutorService_1 = class SessionExecutorService {
    constructor() {
        console.debug(`SessionExecutorService ${SessionExecutorService_1.callTimes++}`);
    }
    sessionExecutor(req, res, ifLoggedIn, ifNotLoggedIn) {
        if (req.session.loggedInUser)
            ifLoggedIn();
        else
            ifNotLoggedIn();
    }
    adminSessionExecutor(req, res, ifLoggedIn, ifNotLoggedIn) {
        req.session.adminEmail ? ifLoggedIn() : ifNotLoggedIn();
    }
};
SessionExecutorService.callTimes = 0;
SessionExecutorService = SessionExecutorService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], SessionExecutorService);
exports.SessionExecutorService = SessionExecutorService;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("mime");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ModuleService_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleService = exports.ModuleCategory = void 0;
const common_1 = __webpack_require__(8);
const database_service_1 = __webpack_require__(13);
var ModuleCategory;
(function (ModuleCategory) {
    ModuleCategory["MED"] = "Medication Counseling";
    ModuleCategory["DIET"] = "Diet Counseling";
    ModuleCategory["CAREER"] = "Career Counseling";
    ModuleCategory["ENTREPRENEURSHIP"] = "Entrepreneurship Counseling";
})(ModuleCategory = exports.ModuleCategory || (exports.ModuleCategory = {}));
let ModuleService = ModuleService_1 = class ModuleService {
    constructor(db) {
        this.db = db;
        console.debug(`ModuleService ${ModuleService_1.callTimes++}`);
    }
    async getAllModules() {
        const dbReturnObject = await this.db.retrieve(database_service_1.EntryType.MODULE);
        if (dbReturnObject.error) {
            console.error(dbReturnObject.error);
            return null;
        }
        const allRows = dbReturnObject.resultObject;
        return allRows;
    }
    async getModulesByCategory(cat) {
        const allModules = await this.getAllModules();
        if (!allModules.length)
            return null;
        const filteredModules = allModules.filter((module) => module.category === cat);
        console.log(filteredModules);
        return filteredModules;
    }
    async getModuleById(id) {
        const allModules = await this.getAllModules();
        if (!allModules.length)
            return null;
        const filteredModule = allModules.find((module) => module.id === id);
        return filteredModule;
    }
    async getModuleAuthorName(id) {
        const { adminemail } = await this.getModuleById(id);
        const members = (await this.db.retrieve(database_service_1.EntryType.MEMBER)).resultObject;
        const theAuthorName = members.find(m => m.email === adminemail).name;
        return theAuthorName;
    }
};
ModuleService.callTimes = 0;
ModuleService = ModuleService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof database_service_1.DatabaseService !== "undefined" && database_service_1.DatabaseService) === "function" ? _a : Object])
], ModuleService);
exports.ModuleService = ModuleService;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionExecutorModule = void 0;
const common_1 = __webpack_require__(8);
const session_executor_service_1 = __webpack_require__(25);
let SessionExecutorModule = class SessionExecutorModule {
};
SessionExecutorModule = __decorate([
    common_1.Module({
        providers: [session_executor_service_1.SessionExecutorService],
        exports: [session_executor_service_1.SessionExecutorService]
    })
], SessionExecutorModule);
exports.SessionExecutorModule = SessionExecutorModule;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelModule = void 0;
const common_1 = __webpack_require__(8);
const model_service_1 = __webpack_require__(17);
const security_module_1 = __webpack_require__(22);
let ModelModule = class ModelModule {
};
ModelModule = __decorate([
    common_1.Module({
        providers: [model_service_1.ModelService],
        exports: [model_service_1.ModelService],
        imports: [security_module_1.SecurityModule]
    })
], ModelModule);
exports.ModelModule = ModelModule;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleModule = void 0;
const common_1 = __webpack_require__(8);
const database_module_1 = __webpack_require__(20);
const module_controller_1 = __webpack_require__(34);
const module_service_1 = __webpack_require__(30);
let ModuleModule = class ModuleModule {
};
ModuleModule = __decorate([
    common_1.Module({
        exports: [module_service_1.ModuleService],
        providers: [module_service_1.ModuleService],
        imports: [database_module_1.DatabaseModule],
        controllers: [module_controller_1.ModuleController]
    })
], ModuleModule);
exports.ModuleModule = ModuleModule;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleController = void 0;
const common_1 = __webpack_require__(8);
const module_service_1 = __webpack_require__(30);
const express_1 = __webpack_require__(11);
let ModuleController = class ModuleController {
    constructor(ms) {
        this.ms = ms;
    }
    async getModuleById(id, res, req) {
        const theModule = await this.ms.getModuleById(id);
        if (!theModule)
            res.render('404', {});
        const theAuthor = await this.ms.getModuleAuthorName(id);
        console.log(theAuthor);
        res.render('Module', { theModule, theAuthor, id, loggedInUser: req.session.loggedInUser });
    }
};
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Res()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object, typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ModuleController.prototype, "getModuleById", null);
ModuleController = __decorate([
    common_1.Controller('module'),
    __metadata("design:paramtypes", [typeof (_c = typeof module_service_1.ModuleService !== "undefined" && module_service_1.ModuleService) === "function" ? _c : Object])
], ModuleController);
exports.ModuleController = ModuleController;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = __webpack_require__(8);
const database_module_1 = __webpack_require__(20);
const module_module_1 = __webpack_require__(33);
const session_executor_module_1 = __webpack_require__(31);
const user_controller_1 = __webpack_require__(36);
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        controllers: [user_controller_1.UserController],
        providers: [],
        imports: [session_executor_module_1.SessionExecutorModule, module_module_1.ModuleModule, database_module_1.DatabaseModule]
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = __webpack_require__(8);
const session_executor_service_1 = __webpack_require__(25);
const express_1 = __webpack_require__(11);
const module_service_1 = __webpack_require__(30);
let UserController = class UserController {
    constructor(se, ms) {
        this.se = se;
        this.ms = ms;
    }
    getAllModules(req, res) {
        this.se.sessionExecutor(req, res, () => {
            res.render('AllModules', {}, (err, html) => {
                if (err)
                    res.status(501).redirect('../');
                else
                    res.send(html);
            });
        }, () => {
            res.status(307).redirect('../auth/login');
        });
    }
    async getMedicationCounseling(req, res) {
        const allModules = await this.ms.getModulesByCategory(module_service_1.ModuleCategory.MED);
        if (!allModules.length) {
            res.render('404', {
                errorMessage: 'There are no Medication Modules Available Yet!',
            });
            return;
        }
        res.render('Medication', { allModules });
    }
    getMedicationSession(req, res) {
        const { name, email, pnNo, date, time } = req.body;
        throw 'expects further implementation';
    }
    async getEntrepreneurshipCounseling(req, res) {
        const allModules = await this.ms.getModulesByCategory(module_service_1.ModuleCategory.ENTREPRENEURSHIP);
        if (!allModules.length) {
            res.render('404', {
                errorMessage: 'There are no Entrepreneurship Modules Available Yet!',
            });
            return;
        }
        res.render('Entrepreneurship', { allModules });
    }
    getEntrepreneurshipSession(req, res) {
        const { name, email, pnNo, date, time } = req.body;
        throw 'expects further implementation';
    }
    async getCareerCounseling(req, res) {
        const allModules = await this.ms.getModulesByCategory(module_service_1.ModuleCategory.CAREER);
        if (!allModules.length) {
            res.render('404', {
                errorMessage: 'There are no Career Modules Available Yet!',
            });
            return;
        }
        res.render('Career', { allModules });
    }
    getCareerSession(req, res) {
        const { name, email, pnNo, date, time } = req.body;
        throw 'expects further implementation';
    }
    async getDietCounseling(req, res) {
        const allModules = await this.ms.getModulesByCategory(module_service_1.ModuleCategory.DIET);
        if (!allModules.length) {
            console.log('rendering 404');
            res.render('404', {
                errorMessage: 'There are no Diet Modules Available Yet!',
            });
            return;
        }
        console.log('rendering diet');
        res.render('Diet', { allModules });
    }
    getDietSession(req, res) {
        const { name, email, pnNo, date, time } = req.body;
        throw 'expects further implementation';
    }
    getProducts(req, res) {
        res.redirect('../listofallproducts');
    }
    getArticle(req, res) { }
    getUserDashboard(req, res) {
        this.se.sessionExecutor(req, res, () => {
            res.render('UserDashboard', {});
        }, () => {
            res.render('404', { errorMessage: 'Please Log In First!' });
        });
    }
    getUserOrders(req, res) {
        this.se.sessionExecutor(req, res, () => {
        }, () => { });
    }
};
__decorate([
    common_1.Get(['', 'AllModules']),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getAllModules", null);
__decorate([
    common_1.Get('MedicationCounseling'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserController.prototype, "getMedicationCounseling", null);
__decorate([
    common_1.Post('Medication'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _f : Object, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getMedicationSession", null);
__decorate([
    common_1.Get('EntrepreneurshipCounseling'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _h : Object, typeof (_j = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UserController.prototype, "getEntrepreneurshipCounseling", null);
__decorate([
    common_1.Post('Entrepreneurship'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _l : Object, typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getEntrepreneurshipSession", null);
__decorate([
    common_1.Get('CareerCounseling'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _o : Object, typeof (_p = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _p : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCareerCounseling", null);
__decorate([
    common_1.Post('Career'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _q : Object, typeof (_r = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _r : Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getCareerSession", null);
__decorate([
    common_1.Get('DietCounseling'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_s = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _s : Object, typeof (_t = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _t : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDietCounseling", null);
__decorate([
    common_1.Post('Diet'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_u = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _u : Object, typeof (_v = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _v : Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getDietSession", null);
__decorate([
    common_1.Get('Products'),
    common_1.Render('ProductSelling.ejs'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_w = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _w : Object, typeof (_x = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _x : Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getProducts", null);
__decorate([
    common_1.Get('Articles'),
    common_1.Render('Articles.ejs'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_y = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _y : Object, typeof (_z = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _z : Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getArticle", null);
__decorate([
    common_1.Get('UserDashboard'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_0 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _0 : Object, typeof (_1 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _1 : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserDashboard", null);
__decorate([
    common_1.Get('UserOrders'),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_2 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _2 : Object, typeof (_3 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _3 : Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserOrders", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [typeof (_4 = typeof session_executor_service_1.SessionExecutorService !== "undefined" && session_executor_service_1.SessionExecutorService) === "function" ? _4 : Object, typeof (_5 = typeof module_service_1.ModuleService !== "undefined" && module_service_1.ModuleService) === "function" ? _5 : Object])
], UserController);
exports.UserController = UserController;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = __webpack_require__(8);
const database_module_1 = __webpack_require__(20);
const products_controller_1 = __webpack_require__(38);
const products_service_1 = __webpack_require__(16);
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    common_1.Module({
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
        imports: [database_module_1.DatabaseModule],
        exports: [products_service_1.ProductsService]
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = __webpack_require__(8);
const products_service_1 = __webpack_require__(16);
const express_1 = __webpack_require__(11);
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async getProductById(res, id) {
        console.log(id);
        const product = await this.productsService.getParticularProduct(id);
        if (!product) {
            res.render('404', {
                errorMessage: 'This Product is No Longer Available!',
            });
            return;
        }
        return { product };
    }
    async getProductInfo(id) {
        const product = await this.productsService.getParticularProduct(id);
        console.log('Recieved');
        return { product };
    }
};
__decorate([
    common_1.Get(':id'),
    common_1.Render('ViewProduct.ejs'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductById", null);
__decorate([
    common_1.Get('getProductInfo/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductInfo", null);
ProductsController = __decorate([
    common_1.Controller('products'),
    __metadata("design:paramtypes", [typeof (_b = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _b : Object])
], ProductsController);
exports.ProductsController = ProductsController;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = __webpack_require__(8);
const database_module_1 = __webpack_require__(20);
const model_module_1 = __webpack_require__(32);
const payment_module_1 = __webpack_require__(40);
const products_module_1 = __webpack_require__(37);
const api_controller_1 = __webpack_require__(44);
const api_service_1 = __webpack_require__(45);
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    common_1.Module({
        controllers: [api_controller_1.ApiController],
        providers: [api_service_1.ApiService],
        imports: [database_module_1.DatabaseModule, model_module_1.ModelModule, payment_module_1.PaymentModule, products_module_1.ProductsModule],
        exports: [api_service_1.ApiService]
    })
], ApiModule);
exports.ApiModule = ApiModule;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = __webpack_require__(8);
const database_module_1 = __webpack_require__(20);
const products_module_1 = __webpack_require__(37);
const payment_service_1 = __webpack_require__(41);
let PaymentModule = class PaymentModule {
};
PaymentModule = __decorate([
    common_1.Module({
        providers: [payment_service_1.PaymentService],
        imports: [products_module_1.ProductsModule, database_module_1.DatabaseModule],
        exports: [payment_service_1.PaymentService]
    })
], PaymentModule);
exports.PaymentModule = PaymentModule;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentService_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = __webpack_require__(8);
__webpack_require__(42).config();
const Razorpay = __webpack_require__(43);
const products_service_1 = __webpack_require__(16);
const crypticKeyGenerator = __webpack_require__(18);
let PaymentService = PaymentService_1 = class PaymentService {
    constructor(productsService) {
        this.productsService = productsService;
        this.rzp = new Razorpay({
            key_id: process.env.key_id,
            key_secret: process.env.key_secret,
        });
        console.debug(`PaymentService ${PaymentService_1.callTimes++}`);
    }
    async generateOrderIdForProduct(product_id, amt) {
        let theOrder;
        await this.rzp.orders.create({
            amount: amt,
            currency: 'INR',
            receipt: this.generateRecieptId(product_id),
        }, (err, order) => {
            if (err)
                console.error(err);
            theOrder = order;
        });
        return theOrder.id;
    }
    async getCheckoutOptionsForProduct(product_id) {
        const theProductDetails = await this.productsService.getParticularProduct(product_id);
        const theProductPrice = this.getProductPrice(theProductDetails.mrp);
        const theOrderId = this.generateOrderIdForProduct(product_id, theProductPrice);
        const options = {
            key: process.env.key_id,
            amount: theProductPrice,
            currency: 'INR',
            name: 'At My Care ',
            description: `Item Bought: ${theProductDetails.brandname}`,
            order: theOrderId,
            callback_url: './api/checkoutdone',
            notes: {
                address: 'MM University',
            },
            theme: {
                color: '#054a29',
            },
        };
        return options;
    }
    getProductPrice(mrp) {
        return mrp * 100;
    }
    generateRecieptId(product_id) {
        return `${crypticKeyGenerator({ length: 7 })}${product_id}`;
    }
};
PaymentService.callTimes = 0;
PaymentService = PaymentService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof products_service_1.ProductsService !== "undefined" && products_service_1.ProductsService) === "function" ? _a : Object])
], PaymentService);
exports.PaymentService = PaymentService;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("razorpay");

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const common_1 = __webpack_require__(8);
const api_service_1 = __webpack_require__(45);
const express_1 = __webpack_require__(11);
const payment_service_1 = __webpack_require__(41);
const model_service_1 = __webpack_require__(17);
const database_service_1 = __webpack_require__(13);
let ApiController = class ApiController {
    constructor(apiService, paymentService, ms, db) {
        this.apiService = apiService;
        this.paymentService = paymentService;
        this.ms = ms;
        this.db = db;
    }
    async fetchCurrentChat(moduleId) {
        const chats = await this.apiService.getChats(moduleId);
        return { chats };
    }
    async updateChat(body, req) {
        console.log(body);
        const { chat, theModuleId } = body;
        const chatter = req.session.loggedInUser;
        const done = await this.apiService.updateChat(theModuleId, chatter, chat);
        console.log(done);
        return { done };
    }
    async newMember(body, req) {
        const { name, email, phone, password, type } = body;
        console.log(name, email, phone, password, type);
    }
    async getCheckoutForProduct(product_id) {
        const checkoutOptions = await this.paymentService.getCheckoutOptionsForProduct(product_id);
        return { checkoutOptions };
    }
    async postPaymentOfProducts(body) {
        console.log(body);
        const { razorpay_payment_id } = body;
        return { thanks: 'thanks' };
    }
    async saveAddress(body) {
        const { al1, al2, al3, pincode } = body;
        const done = await this.apiService.saveAddress(al1, al2, al3, pincode);
        return { done };
    }
};
__decorate([
    common_1.Get('fetchChat/:modId'),
    __param(0, common_1.Param('modId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "fetchCurrentChat", null);
__decorate([
    common_1.Post('updateChat'),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "updateChat", null);
__decorate([
    common_1.Post('becomeAMember'),
    __param(0, common_1.Body()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "newMember", null);
__decorate([
    common_1.Get('getCheckoutForProduct/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getCheckoutForProduct", null);
__decorate([
    common_1.Post('checkoutdone'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "postPaymentOfProducts", null);
__decorate([
    common_1.Post('saveAddress'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "saveAddress", null);
ApiController = __decorate([
    common_1.Controller('api'),
    __metadata("design:paramtypes", [typeof (_c = typeof api_service_1.ApiService !== "undefined" && api_service_1.ApiService) === "function" ? _c : Object, typeof (_d = typeof payment_service_1.PaymentService !== "undefined" && payment_service_1.PaymentService) === "function" ? _d : Object, typeof (_e = typeof model_service_1.ModelService !== "undefined" && model_service_1.ModelService) === "function" ? _e : Object, typeof (_f = typeof database_service_1.DatabaseService !== "undefined" && database_service_1.DatabaseService) === "function" ? _f : Object])
], ApiController);
exports.ApiController = ApiController;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ApiService_1, _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = __webpack_require__(8);
const database_service_1 = __webpack_require__(13);
const model_service_1 = __webpack_require__(17);
let ApiService = ApiService_1 = class ApiService {
    constructor(db, ms) {
        this.db = db;
        this.ms = ms;
        console.debug(`ApiService ${ApiService_1.callTimes++}`);
    }
    async getChats(moduleId) {
        const { error, resultObject } = await this.db.retrieve(database_service_1.EntryType.CHAT, `where moduleid = '${moduleId}'`);
        if (error)
            return null;
        return resultObject;
    }
    async updateChat(moduleId, chatter, chat) {
        const chatObject = this.ms.createChatObject(moduleId, chatter, chat);
        const { error } = await this.db.addChat(chatObject);
        if (error)
            return false;
        return true;
    }
    async newMember({ name, email, phone, password, type }) {
    }
    async saveAddress(al1, al2, al3, pincode) {
        const theAddressObject = this.ms.createAddressObject(al1, al2, al3, pincode);
        this.session_address = Object.assign({}, theAddressObject);
        const { error } = await this.db.addAddress(theAddressObject);
        console.log(error);
        return error ? false : true;
    }
};
ApiService.callTimes = 0;
ApiService = ApiService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof database_service_1.DatabaseService !== "undefined" && database_service_1.DatabaseService) === "function" ? _a : Object, typeof (_b = typeof model_service_1.ModelService !== "undefined" && model_service_1.ModelService) === "function" ? _b : Object])
], ApiService);
exports.ApiService = ApiService;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("express-rate-limit");

/***/ })
/******/ ]);