//// [tests/cases/compiler/moduleAugmentationsImports3.ts] ////

//// [a.ts]

export class A {}

//// [b.ts]
export class B {x: number;}

//// [c.d.ts]
declare module "C" {
    class Cls {y: string; }
}

//// [d.d.ts]
declare module "D" {
    import {A} from "a";
    import {B} from "b";
    module "a" {
        interface A {
            getB(): B;
        }
    }
}

//// [e.ts]
/// <reference path="c.d.ts"/>
import {A} from "./a";
import {Cls} from "C";

(<any>A.prototype).getCls = function () {}

declare module "./a" {
    interface A {
        getCls(): Cls;
    }
}

//// [main.ts]
/// <reference path="d.d.ts"/>
import {A} from "./a";
import "D";
import "e";

let a: A;
let b = a.getB().x.toFixed();
let c = a.getCls().y.toLowerCase();

//// [f.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    var A = (function () {
        function A() {
        }
        return A;
    }());
    exports.A = A;
});
define("b", ["require", "exports"], function (require, exports) {
    "use strict";
    var B = (function () {
        function B() {
        }
        return B;
    }());
    exports.B = B;
});
define("e", ["require", "exports", "a"], function (require, exports, a_1) {
    "use strict";
    a_1.A.prototype.getCls = function () { };
});
define("main", ["require", "exports", "D", "e"], function (require, exports) {
    "use strict";
    var a;
    var b = a.getB().x.toFixed();
    var c = a.getCls().y.toLowerCase();
});


//// [f.d.ts]
/// <reference path="tests/cases/compiler/c.d.ts" />
/// <reference path="tests/cases/compiler/d.d.ts" />
declare module "a" {
    export class A {
    }
}
declare module "b" {
    export class B {
        x: number;
    }
}
declare module "e" {
    import { Cls } from "C";
    module "a" {
        interface A {
            getCls(): Cls;
        }
    }
}
declare module "main" {
}
