import {ArrayLikeSequence} from "./ArrayLikeSequence";
import {FilteredSequence} from "@helps/lazy/Array/filter/FilteredSequence";
import {FlattenedSequence} from "@helps/lazy/Array/flatten/FlattenedSequence";
import {IFilterFn, IMapFn} from "@helps/lazy/Array/interface";
import {MappedSequence} from "@helps/lazy/Array/map/MappedSequence";

export {ArrayWrapper} from "./ArrayWrapper";

const proto = ArrayLikeSequence.prototype as any;

proto.map = function (mapFn: IMapFn) {
	return new MappedSequence(this, mapFn);
};

proto.filter = function (filterFn: IFilterFn) {
	return new FilteredSequence(this, filterFn);
};

proto.flatten = function () {
	return new FlattenedSequence(this);
};
