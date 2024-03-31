from drf_yasg2.inspectors import SwaggerAutoSchema


class CustomAutoSchema(SwaggerAutoSchema):

    def get_tags(self, operation_keys=None):
        tags = self.overrides.get("tags", None) or getattr(self.view, "my_tags", [])
        if not tags:
            tags = [operation_keys[0]]

        return tags
