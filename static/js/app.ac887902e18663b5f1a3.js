webpackJsonp([1],{13:function(t,e,s){"use strict";s.d(e,"a",function(){return k});var n=s(174),a=s.n(n),i=s(176),r=s.n(i),o=s(179),l=s.n(o),c=s(173),u=s.n(c),d=s(177),v=s.n(d),m=s(178),h=s.n(m),f=s(228),p=s(0),g=s(223),j="settings",y="workdayItems",k=function(){function t(e){v()(this,t),this.storage=e,this.storage.get(j)||this.storage.set(j,u()({hourlyIncome:8.84,currentFilter:p().format("MMMM YYYY")})),this.storage.get(y)||this.storage.set(y,u()([]))}return h()(t,[{key:"getAll",value:function(t){if(!t)return JSON.parse(this.storage.get(y));var e=this.getSettings().currentFilter,s=JSON.parse(this.storage.get(y)).filter(function(t){return p(t.start).format("MMMM YYYY")===e});return g.sortBy(s,"start")}},{key:"getAvailableFilters",value:function(){var t=this.getAll();return[].concat(l()(new r.a(t.map(function(t){return p(t.start).format("MMMM YYYY")}))))}},{key:"getSettings",value:function(){return JSON.parse(this.storage.get(j))}},{key:"setHourlyIncome",value:function(t){var e=this.getSettings();e.hourlyIncome=t,this.storage.set(j,u()(e))}},{key:"setCurrentFilter",value:function(t){var e=this.getSettings();e.currentFilter=t,this.storage.set(j,u()(e))}},{key:"totalHours",value:function(t){var e=0;return t.map(function(t){e+=p.duration(t.end.diff(t.start))}),p.duration(e).humanize}},{key:"totalIncome",value:function(t){var e=0;return t.map(function(t){e+=t.income}),e}},{key:"getById",value:function(t){var e=this.getAll(),s=e.findIndex(function(e){return e.id===t});if(s>=0){var n=e[s];return n.itemIndex=s,n}return null}},{key:"setDateTime",value:function(t,e){var s=p(t),n=p(e,"HH:mm a");return s.set({hour:n.get("hour"),minute:n.get("minute")}),s}},{key:"save",value:function(t){var e=this.getAll(),s=this.getSettings(),n=this.setDateTime(t.date,t.start),i=this.setDateTime(t.date,t.end);i<n&&i.add(1,"day");var r=a()(p.duration(i.diff(n)).asMinutes()),o=a()(r/60),l=o+":"+(r-60*o),c=s.hourlyIncome/60*r,d={id:t.id||f(),start:n,end:i,lapse:l,income:c},v=e.findIndex(function(e){return e.id===t.id});v>=0?e[v]=d:e.push(d),this.storage.set(y,u()(e))}},{key:"delete",value:function(t){var e=this.getAll(),s=e.findIndex(function(e){return e.id===t});s>=0&&(e.splice(s,1),this.storage.set(y,u()(e)))}}]),t}()},162:function(t,e,s){"use strict";var n=s(29),a=s(236),i=s(229),r=s.n(i),o=s(230),l=s.n(o),c=s(231),u=s.n(c);n.a.use(a.a),e.a=new a.a({routes:[{path:"/",name:"List",component:l.a},{path:"/view:id",name:"View",component:u.a,props:!0},{path:"/new",name:"Create",component:r.a},{path:"/edit/:id",name:"Edit",component:r.a,props:!0}]})},163:function(t,e,s){function n(t){s(222)}var a=s(17)(s(168),s(232),n,null,null);t.exports=a.exports},167:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(29),a=s(166),i=s.n(a),r=s(163),o=s.n(r),l=s(162),c=s(165),u=s.n(c),d=s(164),v=s.n(d);n.a.use(i.a),n.a.use(u.a),n.a.use(v.a),n.a.config.productionTip=!1,new n.a({el:"#app",router:l.a,template:"<App/>",components:{App:o.a}})},168:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(13);e.default={data:function(){return{settings:{hourlyIncome:0,currentFilter:""},showDialog:!1}},mounted:function(){this.workdays=new n.a(this.$localStorage),this.settings=this.workdays.getSettings()},methods:{loadList:function(){this.$router.push("/")},saveIncome:function(){this.showDialog=!this.showDialog,this.workdays.setHourlyIncome(this.settings.hourlyIncome)},cancel:function(){this.settings=this.workdays.getSettings(),this.showDialog=!this.showDialog}}}},169:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(13),a=s(0),i=s.n(a);e.default={props:["id"],data:function(){return{workdays:null,dialogStart:!1,dialogEnd:!1,item:{date:new Date,start:i()().format("HH:mm a"),end:i()().format("HH:mm a")}}},mounted:function(){this.workdays=new n.a(this.$localStorage);var t=this.workdays.getById(this.id);t&&(this.item={id:this.id,date:t.date,start:i()(t.start).format("HH:mm a"),end:i()(t.end).format("HH:mm a")})},methods:{saveItem:function(){this.workdays.save({id:this.id,date:this.item.date,start:this.item.start,end:this.item.end}),this.$router.push("/")}}}},170:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(13);e.default={data:function(){return{selected:"",workdays:null,workdayItems:[],dialogStart:!1,settings:{hourlyIncome:0,currentFilter:""},availableFilters:[]}},mounted:function(){this.workdays=new n.a(this.$localStorage),this.settings=this.workdays.getSettings(),this.workdayItems=this.workdays.getAll(this.settings.currentFilter),this.availableFilters=this.workdays.getAvailableFilters()},methods:{changeFilter:function(t){this.workdays.setCurrentFilter(t),this.workdayItems=this.workdays.getAll(t)},createItem:function(){this.$router.push("new")},viewItem:function(){this.$router.push("view")}},computed:{totalHours:function(){return this.workdays?this.workdays.totalHours(this.workdayItems):0},totalIncome:function(){return this.workdays?this.workdays.totalIncome(this.workdayItems):0},itemsCount:function(){return this.workdays?this.workdayItems.length:0}}}},171:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(13);e.default={props:["id"],data:function(){return{item:{date:new Date,start:new Date,end:new Date,income:0},workdays:null}},methods:{load:function(){this.item=this.workdays.getById(this.id),this.item||this.$router.push("/")},deleteItem:function(){this.workdays.delete(this.item.id),this.$router.push("/")}},mounted:function(){this.workdays=new n.a(this.$localStorage),this.load()}}},222:function(t,e){},224:function(t,e,s){function n(t){return s(a(t))}function a(t){var e=i[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var i={"./af":46,"./af.js":46,"./ar":53,"./ar-dz":47,"./ar-dz.js":47,"./ar-kw":48,"./ar-kw.js":48,"./ar-ly":49,"./ar-ly.js":49,"./ar-ma":50,"./ar-ma.js":50,"./ar-sa":51,"./ar-sa.js":51,"./ar-tn":52,"./ar-tn.js":52,"./ar.js":53,"./az":54,"./az.js":54,"./be":55,"./be.js":55,"./bg":56,"./bg.js":56,"./bn":57,"./bn.js":57,"./bo":58,"./bo.js":58,"./br":59,"./br.js":59,"./bs":60,"./bs.js":60,"./ca":61,"./ca.js":61,"./cs":62,"./cs.js":62,"./cv":63,"./cv.js":63,"./cy":64,"./cy.js":64,"./da":65,"./da.js":65,"./de":68,"./de-at":66,"./de-at.js":66,"./de-ch":67,"./de-ch.js":67,"./de.js":68,"./dv":69,"./dv.js":69,"./el":70,"./el.js":70,"./en-au":71,"./en-au.js":71,"./en-ca":72,"./en-ca.js":72,"./en-gb":73,"./en-gb.js":73,"./en-ie":74,"./en-ie.js":74,"./en-nz":75,"./en-nz.js":75,"./eo":76,"./eo.js":76,"./es":78,"./es-do":77,"./es-do.js":77,"./es.js":78,"./et":79,"./et.js":79,"./eu":80,"./eu.js":80,"./fa":81,"./fa.js":81,"./fi":82,"./fi.js":82,"./fo":83,"./fo.js":83,"./fr":86,"./fr-ca":84,"./fr-ca.js":84,"./fr-ch":85,"./fr-ch.js":85,"./fr.js":86,"./fy":87,"./fy.js":87,"./gd":88,"./gd.js":88,"./gl":89,"./gl.js":89,"./gom-latn":90,"./gom-latn.js":90,"./he":91,"./he.js":91,"./hi":92,"./hi.js":92,"./hr":93,"./hr.js":93,"./hu":94,"./hu.js":94,"./hy-am":95,"./hy-am.js":95,"./id":96,"./id.js":96,"./is":97,"./is.js":97,"./it":98,"./it.js":98,"./ja":99,"./ja.js":99,"./jv":100,"./jv.js":100,"./ka":101,"./ka.js":101,"./kk":102,"./kk.js":102,"./km":103,"./km.js":103,"./kn":104,"./kn.js":104,"./ko":105,"./ko.js":105,"./ky":106,"./ky.js":106,"./lb":107,"./lb.js":107,"./lo":108,"./lo.js":108,"./lt":109,"./lt.js":109,"./lv":110,"./lv.js":110,"./me":111,"./me.js":111,"./mi":112,"./mi.js":112,"./mk":113,"./mk.js":113,"./ml":114,"./ml.js":114,"./mr":115,"./mr.js":115,"./ms":117,"./ms-my":116,"./ms-my.js":116,"./ms.js":117,"./my":118,"./my.js":118,"./nb":119,"./nb.js":119,"./ne":120,"./ne.js":120,"./nl":122,"./nl-be":121,"./nl-be.js":121,"./nl.js":122,"./nn":123,"./nn.js":123,"./pa-in":124,"./pa-in.js":124,"./pl":125,"./pl.js":125,"./pt":127,"./pt-br":126,"./pt-br.js":126,"./pt.js":127,"./ro":128,"./ro.js":128,"./ru":129,"./ru.js":129,"./sd":130,"./sd.js":130,"./se":131,"./se.js":131,"./si":132,"./si.js":132,"./sk":133,"./sk.js":133,"./sl":134,"./sl.js":134,"./sq":135,"./sq.js":135,"./sr":137,"./sr-cyrl":136,"./sr-cyrl.js":136,"./sr.js":137,"./ss":138,"./ss.js":138,"./sv":139,"./sv.js":139,"./sw":140,"./sw.js":140,"./ta":141,"./ta.js":141,"./te":142,"./te.js":142,"./tet":143,"./tet.js":143,"./th":144,"./th.js":144,"./tl-ph":145,"./tl-ph.js":145,"./tlh":146,"./tlh.js":146,"./tr":147,"./tr.js":147,"./tzl":148,"./tzl.js":148,"./tzm":150,"./tzm-latn":149,"./tzm-latn.js":149,"./tzm.js":150,"./uk":151,"./uk.js":151,"./ur":152,"./ur.js":152,"./uz":154,"./uz-latn":153,"./uz-latn.js":153,"./uz.js":154,"./vi":155,"./vi.js":155,"./x-pseudo":156,"./x-pseudo.js":156,"./yo":157,"./yo.js":157,"./zh-cn":158,"./zh-cn.js":158,"./zh-hk":159,"./zh-hk.js":159,"./zh-tw":160,"./zh-tw.js":160};n.keys=function(){return Object.keys(i)},n.resolve=a,t.exports=n,n.id=224},229:function(t,e,s){var n=s(17)(s(169),s(235),null,null,null);t.exports=n.exports},230:function(t,e,s){var n=s(17)(s(170),s(234),null,null,null);t.exports=n.exports},231:function(t,e,s){var n=s(17)(s(171),s(233),null,null,null);t.exports=n.exports},232:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",{attrs:{id:"Work",toolbar:"","fixed-footer":""}},[s("v-toolbar",{staticClass:"indigo",attrs:{dark:"",fixed:""}},[s("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.loadList()}}},[s("v-icon",{attrs:{dark:""}},[t._v("home")])],1),t._v(" "),s("v-toolbar-title",{staticStyle:{"{cursor":"hand}"},on:{click:function(e){e.stopPropagation(),t.loadList()}}},[t._v("\n      Work days\n    ")]),t._v(" "),s("v-spacer"),t._v(" "),s("v-btn",{staticClass:"primary body-2",attrs:{flat:""},on:{click:function(e){e.stopPropagation(),t.showDialog=!t.showDialog}}},[t._v("\n      Income :"+t._s(t.settings.hourlyIncome.toLocaleString("de-DE",{style:"currency",currency:"EUR"}))+"\n    ")])],1),t._v(" "),s("main",[s("v-container",{attrs:{fluid:""}},[s("router-view")],1)],1),t._v(" "),s("v-footer",{staticClass:"indigo",attrs:{fixed:"",absolute:"","text-xs-center":""}},[s("span",{staticClass:"white--text"},[t._v("Made with ♥ in Berlin")])]),t._v(" "),s("v-dialog",{model:{value:t.showDialog,callback:function(e){t.showDialog=e},expression:"showDialog"}},[s("v-card",[s("v-card-title",{attrs:{"primary-title":""}},[t._v("\n          Set Income\n          "),s("v-spacer"),t._v(" "),s("v-btn",{attrs:{icon:""},on:{click:function(e){t.cancel()}}},[s("v-icon",[t._v("close")])],1)],1),t._v(" "),s("v-card-text",[s("v-text-field",{staticClass:"input-group--focused",attrs:{label:"Income",type:"number"},model:{value:t.settings.hourlyIncome,callback:function(e){t.settings.hourlyIncome=e},expression:"settings.hourlyIncome"}})],1),t._v(" "),s("v-card-actions",[s("v-spacer"),t._v(" "),s("v-btn",{attrs:{success:""},on:{click:function(e){t.saveIncome()}}},[s("v-icon",{attrs:{left:"",dark:""}},[t._v("save")]),t._v("\n          Save\n        ")],1)],1)],1)],1)],1)},staticRenderFns:[]}},233:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-card",[s("v-card-title",{attrs:{"primary-title":""}},[s("div",[t._v(t._s(t._f("moment")(t.item.date,"dddd, MMMM Do YYYY")))])]),t._v(" "),s("v-card-text",[s("p",[t._v("Start: "+t._s(t._f("moment")(t.item.start,"HH:mm a")))]),t._v(" "),s("p",[t._v("End: "+t._s(t._f("moment")(t.item.end,"HH:mm a")))]),t._v(" "),s("v-divider"),t._v(" "),s("p",[t._v("Hours: "+t._s(t.item.lapse))]),t._v(" "),s("v-divider"),t._v(" "),s("p",[t._v("Income: "+t._s(t.item.income.toLocaleString("de-DE",{style:"currency",currency:"EUR"})))])],1),t._v(" "),s("v-card-actions",[s("v-spacer"),t._v(" "),s("v-btn",{attrs:{success:"",to:{name:"Edit",params:{id:this.id}}}},[s("v-icon",{attrs:{left:"",dark:""}},[t._v("edit")]),t._v("\n            Edit\n        ")],1),t._v(" "),s("v-btn",{attrs:{error:""},on:{click:function(e){t.deleteItem()}}},[s("v-icon",{attrs:{left:"",dark:""}},[t._v("delete")]),t._v("\n            Delete\n        ")],1)],1)],1)},staticRenderFns:[]}},234:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-layout",{attrs:{row:""}},[s("v-flex",{attrs:{xs12:"",sm8:"","offset-sm2":""}},[s("v-card",[s("v-card-title",{staticClass:"blue accent-2"},[s("v-select",{attrs:{label:"Month Active",items:t.availableFilters,dark:"","prepend-icon":"date_range"},on:{change:t.changeFilter},model:{value:t.settings.currentFilter,callback:function(e){t.settings.currentFilter=e},expression:"settings.currentFilter"}}),t._v(" "),s("v-spacer"),t._v(" "),s("v-btn",{staticClass:"green",attrs:{fab:"",relative:"",right:"",dark:""},nativeOn:{click:function(e){e.stopPropagation(),t.createItem()}}},[s("v-icon",[t._v("add")])],1)],1),t._v(" "),s("v-list",{attrs:{"two-line":""}},[t._l(t.workdayItems,function(e){return[s("v-list-tile",{key:e.id,attrs:{avatar:"",to:{name:"View",params:{id:e.id}}}},[s("v-list-tile-avatar",[s("v-chip",{staticClass:"green white--text"},[t._v(t._s(t._f("moment")(e.start,"DD")))])],1),t._v(" "),s("v-list-tile-content",[s("v-list-tile-title",[s("span",[t._v(t._s(t._f("moment")(e.start,"HH:mm a"))+" - "+t._s(t._f("moment")(e.end,"HH:mm a")))]),t._v("   \n                 ("+t._s(e.lapse)+")\n               ")]),t._v(" "),s("v-list-tile-sub-title",[t._v("\n                 "+t._s(e.income.toLocaleString("de-DE",{style:"currency",currency:"EUR"}))+"  \n               ")])],1)],1)]})],2),t._v(" "),s("v-card-actions",{staticClass:"blue accent-2 white--text"},[s("v-spacer"),t._v(" "),s("span",{staticClass:"white--text text-xs-right body-2"},[t._v("\n           Total :"+t._s(t.totalIncome.toLocaleString("de-DE",{style:"currency",currency:"EUR"}))+"\n         ")])],1)],1)],1)],1)},staticRenderFns:[]}},235:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",[s("v-layout",{staticStyle:{position:"relative"},attrs:{row:"","justify-center":""}},[s("v-date-picker",{model:{value:t.item.date,callback:function(e){t.item.date=e},expression:"item.date"}}),t._v(" "),s("v-btn",{staticClass:"mt-4",attrs:{fab:"",absolute:"",right:"",success:"",dark:""},nativeOn:{click:function(e){e.stopPropagation(),t.saveItem()}}},[s("v-icon",[t._v("save")])],1)],1),t._v(" "),s("v-layout",{staticStyle:{position:"relative"},attrs:{row:"","justify-center":""}},[s("v-btn",{attrs:{primary:""},nativeOn:{click:function(e){e.stopPropagation(),t.dialogStart=!0}}},[t._v("Start: "+t._s(t.item.start))]),t._v(" "),s("v-btn",{attrs:{primary:""},nativeOn:{click:function(e){e.stopPropagation(),t.dialogEnd=!0}}},[t._v("End: "+t._s(t.item.end))])],1),t._v(" "),s("v-dialog",{model:{value:t.dialogStart,callback:function(e){t.dialogStart=e},expression:"dialogStart"}},[s("v-flex",{attrs:{row:""}},[s("v-time-picker",{model:{value:t.item.start,callback:function(e){t.item.start=e},expression:"item.start"}})],1),t._v(" "),s("v-flex",{staticClass:"primary text-xs-right",attrs:{row:""}},[s("v-btn",{nativeOn:{click:function(e){t.dialogStart=!1}}},[s("v-icon",{attrs:{left:""}},[t._v("check")]),t._v("\n        OK\n      ")],1)],1)],1),t._v(" "),s("v-dialog",{model:{value:t.dialogEnd,callback:function(e){t.dialogEnd=e},expression:"dialogEnd"}},[s("v-flex",{attrs:{row:""}},[s("v-time-picker",{model:{value:t.item.end,callback:function(e){t.item.end=e},expression:"item.end"}})],1),t._v(" "),s("v-flex",{staticClass:"primary text-xs-right",attrs:{row:""}},[s("v-btn",{nativeOn:{click:function(e){t.dialogEnd=!1}}},[s("v-icon",{attrs:{left:""}},[t._v("check")]),t._v("\n        OK\n      ")],1)],1)],1)],1)},staticRenderFns:[]}}},[167]);
//# sourceMappingURL=app.ac887902e18663b5f1a3.js.map