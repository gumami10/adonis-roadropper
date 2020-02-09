'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Roadmap = use('App/Models/Roadmap');

/**
 * Resourceful controller for interacting with roadmaps
 */
class RoadmapController {
  /**
   * Show a list of all roadmaps.
   * GET roadmaps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const roadmaps = await Roadmap.all()

    return roadmaps

  }

  /**
   * Render a form to be used for creating a new roadmap.
   * GET roadmaps/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

  }

  /**
   * Create/save a new roadmap.
   * POST roadmaps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.post()
    const roadmap = await Roadmap.create({ ...data })
    return roadmap

  }

  /**
   * Display a single roadmap.
   * GET roadmaps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update roadmap details.
   * PUT or PATCH roadmaps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, auth, request }) {
    const roadmap = await Roadmap.findOrFail(params.id)
    const data = request.post()

    if (roadmap.creator !== auth.user.id) {
      return response.status(401)
    }

    const result = await roadmap.save({ ...data })

    return result

  }

  /**
   * Delete a roadmap with id.
   * DELETE roadmaps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {

    const roadmap = await Roadmap.findOrFail(params.id)

    if (roadmap.creator !== auth.user.id) {
      return response.status(401)
    }

    await roadmap.delete()

    return response.status(200)

  }
}

module.exports = RoadmapController
